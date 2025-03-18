import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { debounce } from '../utils/debounce';
import { Trie } from '../utils/searchTrie';
import type { User } from '../types';

export const UserSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [trie, setTrie] = useState<Trie>(new Trie());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        
        // Build Trie with user names
        const newTrie = new Trie();
        data.forEach((user: User) => newTrie.insert(user.name));
        setTrie(newTrie);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (!term.trim()) {
        setFilteredUsers(users);
        return;
      }

      const matchedNames = trie.search(term);
      const filtered = users.filter(user => 
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