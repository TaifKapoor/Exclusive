import Link from 'next/link';
import { User, ShoppingBag, Truck, LogOut, Settings } from 'lucide-react';

const navItems = [
    { name: "Manage My Account", icon: User, items: [
        { label: "My Profile", link: "/account", isActive: true },
        { label: "Address Book", link: "/account/address" },
    ]},
    { name: "My Orders", icon: ShoppingBag, items: [
        { label: "My Returns", link: "/account/returns" },
        { label: "My Cancellations", link: "/account/cancellations" },
    ]},
    { name: "My Wishlist", icon: Heart, link: "/wishlist" },
    
];

const AccountSidebar = () => {
  return (
    <div className="w-full lg:w-64 space-y-6">
      <h2 className="text-xl font-semibold mb-6">Welcome!</h2>
      
      <nav className="space-y-4">
        {navItems.map((section, index) => (
          <div key={index}>
            <h3 className="flex items-center space-x-2 text-foreground font-medium mb-2">
                {section.icon && <section.icon size={18} />}
                <span>{section.name}</span>
            </h3>
            {section.items && (
                <ul className="space-y-1 pl-6 border-l border-gray-300">
                    {section.items.map((item) => (
                        <li key={item.label}>
                            <Link 
                                href={item.link} 
                                className={`text-sm hover:text-primary transition-colors ${item.isActive ? 'text-primary font-medium' : 'text-dark-gray'}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {section.link && (
                 <Link 
                    href={section.link} 
                    className="flex items-center space-x-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                    {section.icon && <section.icon size={18} />}
                    <span>{section.name}</span>
                </Link>
            )}
          </div>
        ))}
      </nav>
      
      <div className="pt-4 border-t border-gray-200">
        <Link 
          href="/logout" 
          className="flex items-center space-x-2 text-sm text-dark-gray hover:text-primary transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AccountSidebar;