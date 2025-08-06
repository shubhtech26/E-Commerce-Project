import React from 'react';
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  CubeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency } from '../../../utils';
import { mockAdminStats } from '../../../data/mockData';

const AdminDashboard = () => {
  const stats = mockAdminStats;

  const StatCard = ({ title, value, icon: Icon, growth, isPositive = true, prefix = '' }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">
                {prefix}{typeof value === 'number' && prefix === '$' ? formatCurrency(value) : value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <ArrowUpIcon className="flex-shrink-0 self-center h-4 w-4" />
            ) : (
              <ArrowDownIcon className="flex-shrink-0 self-center h-4 w-4" />
            )}
            <span className="ml-1 font-medium">{growth}%</span>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            icon={CurrencyDollarIcon}
            growth={stats.revenueGrowth}
            prefix="$"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingBagIcon}
            growth={stats.orderGrowth}
          />
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={UserGroupIcon}
            growth={stats.customerGrowth}
          />
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={CubeIcon}
            growth={stats.productGrowth}
          />
        </div>

        {/* Charts and Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Sales</h3>
            <div className="space-y-3">
              {stats.salesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.month}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${(item.sales / 30000) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.sales)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {stats.recentOrders.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(order.total)}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
            <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.topProducts.map((product) => (
              <div key={product._id} className="text-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                />
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(product.price)}
                </p>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors">
            <h4 className="font-medium mb-2">Add New Product</h4>
            <p className="text-sm opacity-90">Create a new product listing</p>
          </button>
          
          <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
            <h4 className="font-medium mb-2">Process Orders</h4>
            <p className="text-sm opacity-90">Manage pending orders</p>
          </button>
          
          <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
            <h4 className="font-medium mb-2">View Analytics</h4>
            <p className="text-sm opacity-90">Detailed sales reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;