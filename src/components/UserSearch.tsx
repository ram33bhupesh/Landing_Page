import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { debounce } from '../utils/debounce';
import { Trie } from '../utils/searchTrie';
import type { User } from '../types';

export const UserSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Aarav Patel',
      username: 'aaravp',
      email: 'aarav.patel@example.com',
      address: {
        street: '123 Gandhi Road',
        suite: 'Apt. 101',
        city: 'Mumbai',
        zipcode: '400001',
        geo: { lat: '18.9750', lng: '72.8258' },
      },
      phone: '+91 98765 43210',
      website: 'aaravpatel.com',
      company: {
        name: 'Patel Industries',
        catchPhrase: 'Innovating for a better tomorrow',
        bs: 'leveraging cutting-edge technology',
      },
    },
    {
      id: 2,
      name: 'Priya Sharma',
      username: 'priyas',
      email: 'priya.sharma@example.com',
      address: {
        street: '456 Nehru Lane',
        suite: 'Apt. 202',
        city: 'Delhi',
        zipcode: '110001',
        geo: { lat: '28.6139', lng: '77.2090' },
      },
      phone: '+91 87654 32109',
      website: 'priyasharma.com',
      company: {
        name: 'Sharma Solutions',
        catchPhrase: 'Empowering businesses',
        bs: 'scalable business solutions',
      },
    },
    {
      id: 3,
      name: 'Rahul Singh',
      username: 'rahuls',
      email: 'rahul.singh@example.com',
      address: {
        street: '789 Tagore Street',
        suite: 'Apt. 303',
        city: 'Bangalore',
        zipcode: '560001',
        geo: { lat: '12.9716', lng: '77.5946' },
      },
      phone: '+91 76543 21098',
      website: 'rahulsingh.com',
      company: {
        name: 'Singh Tech',
        catchPhrase: 'Transforming ideas into reality',
        bs: 'innovative tech solutions',
      },
    },
    {
      id: 4,
      name: 'Ananya Reddy',
      username: 'ananyar',
      email: 'ananya.reddy@example.com',
      address: {
        street: '321 Ambedkar Road',
        suite: 'Apt. 404',
        city: 'Hyderabad',
        zipcode: '500001',
        geo: { lat: '17.3850', lng: '78.4867' },
      },
      phone: '+91 65432 10987',
      website: 'ananyareddy.com',
      company: {
        name: 'Reddy Enterprises',
        catchPhrase: 'Driving excellence',
        bs: 'sustainable business growth',
      },
    },
    {
      id: 5,
      name: 'Vikram Gupta',
      username: 'vikramg',
      email: 'vikram.gupta@example.com',
      address: {
        street: '654 Bose Avenue',
        suite: 'Apt. 505',
        city: 'Kolkata',
        zipcode: '700001',
        geo: { lat: '22.5726', lng: '88.3639' },
      },
      phone: '+91 54321 09876',
      website: 'vikramgupta.com',
      company: {
        name: 'Gupta Innovations',
        catchPhrase: 'Pioneering the future',
        bs: 'disruptive innovation',
      },
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [trie, setTrie] = useState<Trie>(new Trie());
  const [loading, setLoading] = useState(false); // Set to false since data is local

  useEffect(() => {
    // Build Trie with user names
    const newTrie = new Trie();
    users.forEach((user) => newTrie.insert(user.name));
    setTrie(newTrie);
    setFilteredUsers(users); // Initialize filteredUsers with all users
  }, [users]);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (!term.trim()) {
        setFilteredUsers(users);
        return;
      }

      const matchedNames = trie.search(term);
      const filtered = users.filter((user) =>
        matchedNames.includes(user.name)
      );
      setFilteredUsers(filtered);
    }, 300),
    [users, trie]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Users</h2>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
              <div
                key={user.id}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <p className="text-gray-600 mb-2">{user.phone}</p>
                <div className="text-sm text-gray-500">
                  <p>Company: {user.company.name}</p>
                  <p className="italic">"{user.company.catchPhrase}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
