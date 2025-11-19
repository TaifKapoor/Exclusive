// app/api/products/route.js
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
export const runtime = "nodejs";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();
    const ids = searchParams.get('ids');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort') || 'newest';

    let query = {};

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (ids) {
      const idArray = ids.split(',').map(id => id.trim());
      query.id = { $in: idArray };
    }

    let productQuery = Product.find(query);

    if (limit && !isNaN(limit)) {
      productQuery = productQuery.limit(parseInt(limit));
    }

    let sortObj = { createdAt: -1 };
    switch (sort) {
      case 'price-asc': sortObj = { price: 1 }; break;
      case 'price-desc': sortObj = { price: -1 }; break;
      case 'rating-desc': sortObj = { rating: -1 }; break;
      default: sortObj = { createdAt: -1 };
    }
    productQuery = productQuery.sort(sortObj);

    const products = await productQuery.lean();

    return NextResponse.json(Array.isArray(products) ? products : []);

  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json([], { status: 200 });
  }
}



export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log('Body:', body);

    if (!body.name || !body.price || !body.images || body.images.length === 0 || !body.category) {
      return NextResponse.json(
        { error: 'Name, Price, Image, Category required' },
        { status: 400 }
      );
    }
    body.images = Array.isArray(body.images) ? body.images : [body.images];
    delete body.image;

   
    let nextNum = 1; 
    try {
      
      const lastProduct = await Product.aggregate([
         
          { $match: { id: /^p/ } }, 
          
          { $addFields: { idNumber: { $toInt: { $substrCP: ["$id", 1, { $strLenCP: "$id" }] } } } },
          
          { $sort: { idNumber: -1 } },
          
          { $limit: 1 }
      ]);

      if (lastProduct.length > 0 && lastProduct[0].idNumber) {
       
        nextNum = lastProduct[0].idNumber + 1;
      } else {
        
        nextNum = 19; 
      }
    } catch (e) {
      console.error("ID Generation Error:", e);
 
      try {
        const last = await Product.findOne().sort({ createdAt: -1 }).select('id').lean();
        if (last?.id?.startsWith('p')) {
            const num = parseInt(last.id.slice(1), 10);
            if (!isNaN(num) && num >= 18) nextNum = num + 1;
        }
      } catch (e2) {}
    }
    
    body.id = `p${String(nextNum).padStart(3, '0')}`;
    console.log(`Assigned new ID: ${body.id}`); 

    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
   
    if (error.code === 11000) {
        return NextResponse.json(
            { error: 'Duplicate ID error. Please try again or check existing products.', details: error.message },
            { status: 409 } 
        );
    }
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}