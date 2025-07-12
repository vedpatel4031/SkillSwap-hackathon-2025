import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    profilePhoto: null,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const locationOptions = [
    { value: 'new-york', label: 'New York, NY' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'houston', label: 'Houston, TX' },
    { value: 'phoenix', label: 'Phoenix, AZ' },
    { value: 'philadelphia', label: 'Philadelphia, PA' },
    { value: 'san-antonio', label: 'San Antonio, TX' },
    { value: 'san-diego', label: 'San Diego, CA' },
    { value: 'dallas', label: 'Dallas, TX' },
    { value: 'san-jose', label: 'San Jose, CA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'jacksonville', label: 'Jacksonville, FL' },
    { value: 'fort-worth', label: 'Fort Worth, TX' },
    { value: 'columbus', label: 'Columbus, OH' },
    { value: 'charlotte', label: 'Charlotte, NC' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'indianapolis', label: 'Indianapolis, IN' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'denver', label: 'Denver, CO' },
    { value: 'boston', label: 'Boston, MA' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLocationChange = (value) => {
    setFormData(prev => ({ ...prev, location: value }));
    if (errors.location) {
      setErrors(prev => ({ ...prev, location: '' }));
    }
  };

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
      
      if (errors.profilePhoto) {
        setErrors(prev => ({ ...prev, profilePhoto: '' }));
      }
    } else {
      setErrors(prev => ({ ...prev, profilePhoto: 'Please select a valid image file' }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.location) {
      newErrors.location = 'Please select your location';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful registration
      navigate('/profile-management');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    setIsLoading(true);
    // Simulate social registration
    setTimeout(() => {
      navigate('/profile-management');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">{errors.general}</p>
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
        required
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          description="8+ characters with uppercase, lowercase, and number"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          required
        />
      </div>

      <Select
        label="Location"
        placeholder="Select your city"
        options={locationOptions}
        value={formData.location}
        onChange={handleLocationChange}
        error={errors.location}
        searchable
        required
      />

      {/* Profile Photo Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Profile Photo <span className="text-muted-foreground">(Optional)</span>
        </label>
        
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-smooth ${
            dragActive
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {photoPreview ? (
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                <Image
                  src={photoPreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-foreground font-medium">Photo uploaded</p>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview(null);
                    setFormData(prev => ({ ...prev, profilePhoto: null }));
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Remove photo
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Icon name="Camera" size={24} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground font-medium">
                  Drop your photo here, or{' '}
                  <label className="text-primary cursor-pointer hover:text-primary/80">
                    browse
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>
        
        {errors.profilePhoto && (
          <p className="text-sm text-error">{errors.profilePhoto}</p>
        )}
      </div>

      <Checkbox
        label={
          <span className="text-sm">
            I agree to the{' '}
            <button
              type="button"
              className="text-primary hover:text-primary/80 transition-smooth"
              onClick={() => alert('Terms and Conditions would open here')}
            >
              Terms and Conditions
            </button>
            {' '}and{' '}
            <button
              type="button"
              className="text-primary hover:text-primary/80 transition-smooth"
              onClick={() => alert('Privacy Policy would open here')}
            >
              Privacy Policy
            </button>
          </span>
        }
        name="agreeToTerms"
        checked={formData.agreeToTerms}
        onChange={handleInputChange}
        error={errors.agreeToTerms}
        required
      />

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        className="h-12"
      >
        Create Account
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or sign up with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialRegister('google')}
          iconName="Chrome"
          iconPosition="left"
          className="h-12"
        >
          Google
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialRegister('linkedin')}
          iconName="Linkedin"
          iconPosition="left"
          className="h-12"
        >
          LinkedIn
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;