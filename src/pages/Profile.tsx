import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Phone, MapPin, Building, CreditCard, Lock, Save, Edit, X } from 'lucide-react';
import { getUserSettings, upsertUserSettings } from '../lib/api';

const Profile: React.FC = () => {
  const { user, session, loading, isAuthenticated } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    companyName: 'SmartQuot',
    gstNo: '22AAAAA0000A1Z5',
    address: '123, Main Street, City, State, 123456',
    logo: '',
    subscription: 'Pro Plan (valid till 2025-12-31)',
    phone: '+91-1234567890',
    email: '',
  });
  const [quotationDetails, setQuotationDetails] = useState({
    includeCompanyName: true,
    includeAddress: true,
    includePhone: true,
    includeEmail: true,
    includeGst: true,
    includeLogo: true,
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [logoPreview, setLogoPreview] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load settings from Supabase (and migrate from localStorage if needed)
  useEffect(() => {
    const loadAndMigrateProfile = async () => {
      if (!user) return;
      try {
        let settings = await getUserSettings(user.id);
        // If no settings in Supabase, migrate from localStorage if present
        if (!settings) {
          const localProfile = {
            companyName: localStorage.getItem('company_name') || 'SmartQuot',
            gstNo: localStorage.getItem('gst_no') || '22AAAAA0000A1Z5',
            address: localStorage.getItem('company_address') || '123, Main Street, City, State, 123456',
            logo: '',
            phone: localStorage.getItem('company_phone') || '+91-1234567890',
            email: localStorage.getItem('company_email') || user.email || 'info@yourcompany.com',
          };
          const localQuotationDetails = {
            includeCompanyName: localStorage.getItem('include_company_name') !== 'false',
            includeAddress: localStorage.getItem('include_address') !== 'false',
            includePhone: localStorage.getItem('include_phone') !== 'false',
            includeEmail: localStorage.getItem('include_email') !== 'false',
            includeGst: localStorage.getItem('include_gst') !== 'false',
            includeLogo: localStorage.getItem('include_logo') !== 'false',
          };
          await upsertUserSettings(user.id, {
            company_name: localProfile.companyName,
            company_address: localProfile.address,
            company_phone: localProfile.phone,
            company_email: localProfile.email,
            gst_no: localProfile.gstNo,
            logo: localProfile.logo,
            include_company_name: localQuotationDetails.includeCompanyName,
            include_address: localQuotationDetails.includeAddress,
            include_phone: localQuotationDetails.includePhone,
            include_email: localQuotationDetails.includeEmail,
            include_gst: localQuotationDetails.includeGst,
            include_logo: localQuotationDetails.includeLogo,
          });
          // Remove from localStorage after migration
          localStorage.removeItem('company_name');
          localStorage.removeItem('company_address');
          localStorage.removeItem('company_phone');
          localStorage.removeItem('company_email');
          localStorage.removeItem('gst_no');
          localStorage.removeItem('logo');
          localStorage.removeItem('include_company_name');
          localStorage.removeItem('include_address');
          localStorage.removeItem('include_phone');
          localStorage.removeItem('include_email');
          localStorage.removeItem('include_gst');
          localStorage.removeItem('include_logo');
          settings = await getUserSettings(user.id);
        }
        if (settings) {
          setProfile({
            companyName: settings.company_name || 'SmartQuot',
            gstNo: settings.gst_no || '22AAAAA0000A1Z5',
            address: settings.company_address || '123, Main Street, City, State, 123456',
            logo: settings.logo || '',
            subscription: 'Pro Plan (valid till 2025-12-31)',
            phone: settings.company_phone || '+91-1234567890',
            email: settings.company_email || user.email || 'info@yourcompany.com',
          });
          setQuotationDetails({
            includeCompanyName: settings.include_company_name !== false,
            includeAddress: settings.include_address !== false,
            includePhone: settings.include_phone !== false,
            includeEmail: settings.include_email !== false,
            includeGst: settings.include_gst !== false,
            includeLogo: settings.include_logo !== false,
          });
        }
      } catch (error) {
        console.error('Error loading user profile settings:', error);
      }
    };
    loadAndMigrateProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuotationDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setQuotationDetails((prev) => ({ ...prev, [name]: checked }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile((prev) => ({ ...prev, logo: file.name }));
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    // Clear any previous messages when user starts typing
    setPasswordMessage(null);
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      await upsertUserSettings(user.id, {
        company_name: profile.companyName,
        company_address: profile.address,
        company_phone: profile.phone,
        company_email: profile.email || user.email || 'info@yourcompany.com',
        gst_no: profile.gstNo,
        logo: profile.logo,
        include_company_name: quotationDetails.includeCompanyName,
        include_address: quotationDetails.includeAddress,
        include_phone: quotationDetails.includePhone,
        include_email: quotationDetails.includeEmail,
        include_gst: quotationDetails.includeGst,
        include_logo: quotationDetails.includeLogo,
      });
      setEditing(false);
    } catch (error) {
      console.error('Error saving user profile settings:', error);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwords.new !== passwords.confirm) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwords.new.length < 8) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
      return;
    }

    setPasswordLoading(true);
    setPasswordMessage(null);

    try {
      // For Auth0 password change, you would typically:
      // 1. Use Auth0 Management API to change password
      // 2. Or redirect to Auth0's password change page
      // 3. Or use Auth0's password reset flow
      
      // For now, we'll simulate the process
      // In a real implementation, you would call your backend API
      // which would use Auth0 Management API to update the password
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswords({ current: '', new: '', confirm: '' });
      
      // Optionally, you can redirect to Auth0's password change page:
      // window.location.href = `https://smartquot.us.auth0.com/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=openid%20profile%20email&audience=https://smartquot.us.auth0.com/api/v2/&prompt=login`;
      
    } catch (error) {
      setPasswordMessage({ type: 'error', text: 'Failed to update password. Please try again.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>

        <div className="p-6">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
              {logoPreview || profile.logo ? (
                <img
                  src={logoPreview || profile.logo}
                  alt="Company Logo"
                  className="h-24 w-24 object-cover rounded-full border border-gray-300"
                />
              ) : (
                <div className="h-24 w-24 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-full border border-gray-300">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            {editing && (
              <div className="flex items-center space-x-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleLogoChange}
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Company Name
              </label>
              {editing ? (
                <input
                  type="text"
                  name="companyName"
                  value={profile.companyName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profile.companyName}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">GST Number</label>
              {editing ? (
                <input
                  type="text"
                  name="gstNo"
                  value={profile.gstNo}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profile.gstNo}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center">
                {user?.email || 'user@example.com'}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </label>
              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profile.phone}</div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Address
              </label>
              {editing ? (
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profile.address}</div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Subscription Details
              </label>
              <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profile.subscription}</div>
            </div>
          </div>

          {/* Quotation Details Preferences */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Quotation Details Preferences
            </h3>
            <p className="text-gray-600 mb-4">Select which company details to include in your quotations</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includeCompanyName"
                  name="includeCompanyName"
                  checked={quotationDetails.includeCompanyName}
                  onChange={handleQuotationDetailsChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="includeCompanyName" className="text-gray-700">Include Company Name</label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includeAddress"
                  name="includeAddress"
                  checked={quotationDetails.includeAddress}
                  onChange={handleQuotationDetailsChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="includeAddress" className="text-gray-700">Include Address</label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includePhone"
                  name="includePhone"
                  checked={quotationDetails.includePhone}
                  onChange={handleQuotationDetailsChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="includePhone" className="text-gray-700">Include Phone Number</label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includeEmail"
                  name="includeEmail"
                  checked={quotationDetails.includeEmail}
                  onChange={handleQuotationDetailsChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="includeEmail" className="text-gray-700">Include Email</label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includeGst"
                  name="includeGst"
                  checked={quotationDetails.includeGst}
                  onChange={handleQuotationDetailsChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="includeGst" className="text-gray-700">Include GST Number</label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includeLogo"
                  name="includeLogo"
                  checked={quotationDetails.includeLogo}
                  onChange={handleQuotationDetailsChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="includeLogo" className="text-gray-700">Include Company Logo</label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            {editing ? (
              <>
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
                  onClick={() => setEditing(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                onClick={() => setEditing(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow-md mt-6">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Change Password
          </h2>
          <p className="text-gray-600 mt-1">Update your password for enhanced security</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Current Password</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">New Password</label>
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {passwordMessage && (
            <div className={`mb-4 p-3 rounded-lg ${
              passwordMessage.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {passwordMessage.text}
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Password must be at least 8 characters long
            </p>
            <button 
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              onClick={handlePasswordUpdate}
              disabled={passwordLoading || !passwords.current || !passwords.new || !passwords.confirm}
            >
              {passwordLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Lock className="w-4 h-4 mr-2" />
              )}
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 