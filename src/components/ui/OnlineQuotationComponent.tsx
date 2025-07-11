"use client"

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Download, 
  Calendar, 
  Building2, 
  User, 
  FileText, 
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal,
  IndianRupee,
  Share2,
  Printer,
  Eye,
  EyeOff,
  Edit,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'

interface QuotationItem {
  id: string;
  description: string;
  size: string;
  surface: string;
  actualSqftPerBox: number;
  billedSqftPerBox: number;
  sqftNeeded: number;
  boxNeeded: number;
  quantity: number;
  unitPrice: number;
  pricePerBox: number;
  discount: number;
  total: number;
  margin: number;
  marginPercentage: number;
  category: string;
  imageUrl?: string;
}

interface QuotationRoom {
  room_name: string;
  items: QuotationItem[];
  room_total?: number;
}

interface QuotationData {
  id: string;
  quotationNumber: string;
  date: string;
  validUntil: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  companyLogo?: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  clientName: string;
  clientCompany: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  items: QuotationItem[];
  notes: string;
  terms: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  attachments: File[];
  sqftInBoxType: string;
  showSqftInBox: boolean;
  showSqftNeeded: boolean;
  showBoxNeeded: boolean;
  showPricePerSqft: boolean;
  showPricePerBox: boolean;
  showAmount: boolean;
  showMargin: boolean;
  isAreaWise?: boolean;
  rooms?: QuotationRoom[];
  includeImages: boolean;
}

interface FormErrors {
  [key: string]: string
}

interface OnlineQuotationComponentProps {
  quotationData?: QuotationData;
}

const OnlineQuotationComponent: React.FC<OnlineQuotationComponentProps> = ({ quotationData: propQuotationData }) => {
  const [quotationData, setQuotationData] = useState<QuotationData>(
    propQuotationData || {
      id: 'QUO-2024-001',
      quotationNumber: 'QUO-2024-001',
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'draft',
      companyName: 'TechSolutions Inc.',
      companyAddress: '123 Business Ave, Suite 100\nNew York, NY 10001',
      companyPhone: '+1 (555) 123-4567',
      companyEmail: 'contact@techsolutions.com',
      clientName: 'John Smith',
      clientCompany: 'ABC Corporation',
      clientAddress: '456 Client Street\nBoston, MA 02101',
      clientPhone: '+1 (555) 987-6543',
      clientEmail: 'john.smith@abccorp.com',
      items: [
        {
          id: '1',
          description: 'Web Development Services',
          size: '1000',
          surface: '1000',
          actualSqftPerBox: 1000,
          billedSqftPerBox: 1000,
          sqftNeeded: 1000,
          boxNeeded: 1,
          quantity: 1,
          unitPrice: 5000,
          pricePerBox: 5000,
          discount: 0,
          total: 5000,
          margin: 0,
          marginPercentage: 0,
          category: 'Development'
        },
        {
          id: '2',
          description: 'UI/UX Design Package',
          size: '1000',
          surface: '1000',
          actualSqftPerBox: 1000,
          billedSqftPerBox: 1000,
          sqftNeeded: 1000,
          boxNeeded: 1,
          quantity: 1,
          unitPrice: 2500,
          pricePerBox: 2500,
          discount: 10,
          total: 2250,
          margin: 0,
          marginPercentage: 0,
          category: 'Design'
        }
      ],
      notes: 'Thank you for considering our services. We look forward to working with you.',
      terms: 'Payment terms: 50% upfront, 50% upon completion. Project timeline: 6-8 weeks.',
      subtotal: 7250,
      taxRate: 8.5,
      taxAmount: 616.25,
      totalAmount: 7866.25,
      attachments: [],
      sqftInBoxType: 'actual',
      showSqftInBox: true,
      showSqftNeeded: true,
      showBoxNeeded: true,
      showPricePerSqft: true,
      showPricePerBox: true,
      showAmount: true,
      showMargin: true,
      includeImages: true
    }
  )

  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<QuotationItem | null>(null)
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const categories = ['Development', 'Design', 'Consulting', 'Support', 'Other']
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    
    if (!quotationData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    if (!quotationData.clientName.trim()) {
      newErrors.clientName = 'Client name is required'
    }
    if (!quotationData.quotationNumber.trim()) {
      newErrors.quotationNumber = 'Quotation number is required'
    }
    if (quotationData.items.length === 0) {
      newErrors.items = 'At least one item is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [quotationData])

  const calculateTotals = useCallback(() => {
    const subtotal = quotationData.items.reduce((sum, item) => sum + item.total, 0)
    const taxAmount = (subtotal * quotationData.taxRate) / 100
    const totalAmount = subtotal + taxAmount

    setQuotationData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      totalAmount
    }))
  }, [quotationData.items, quotationData.taxRate])

  const handleInputChange = (field: keyof QuotationData, value: any) => {
    setQuotationData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleItemChange = (field: keyof QuotationItem, value: any) => {
    if (!editingItem) return

    const updatedItem = { ...editingItem, [field]: value }
    
    if (field === 'quantity' || field === 'unitPrice' || field === 'discount') {
      const quantity = field === 'quantity' ? value : updatedItem.quantity
      const unitPrice = field === 'unitPrice' ? value : updatedItem.unitPrice
      const discount = field === 'discount' ? value : updatedItem.discount
      
      const discountAmount = (unitPrice * discount) / 100
      const total = quantity * (unitPrice - discountAmount)
      updatedItem.total = total
    }

    setEditingItem(updatedItem)
  }

  const addOrUpdateItem = () => {
    if (!editingItem) return

    if (!editingItem.description.trim()) {
      setErrors(prev => ({ ...prev, itemDescription: 'Description is required' }))
      return
    }

    setQuotationData(prev => {
      const existingIndex = prev.items.findIndex(item => item.id === editingItem.id)
      let newItems

      if (existingIndex >= 0) {
        newItems = [...prev.items]
        newItems[existingIndex] = editingItem
      } else {
        newItems = [...prev.items, { ...editingItem, id: Date.now().toString() }]
      }

      return { ...prev, items: newItems }
    })

    setEditingItem(null)
    setIsItemDialogOpen(false)
    setErrors(prev => ({ ...prev, itemDescription: '' }))
  }

  const deleteItem = (itemId: string) => {
    setQuotationData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'attachment' | 'logo') => {
    const files = event.target.files
    if (!files) return

    setIsLoading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          
          if (type === 'logo') {
            const file = files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
              setQuotationData(prev => ({
                ...prev,
                companyLogo: e.target?.result as string
              }))
            }
            reader.readAsDataURL(file)
          } else {
            setQuotationData(prev => ({
              ...prev,
              attachments: [...prev.attachments, ...Array.from(files)]
            }))
          }
          
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const exportQuotation = async () => {
    setIsLoading(true)
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create a simple text export (in real app, this would be PDF)
    const exportData = `
QUOTATION: ${quotationData.quotationNumber}
Date: ${quotationData.date}
Valid Until: ${quotationData.validUntil}

FROM:
${quotationData.companyName}
${quotationData.companyAddress}

TO:
${quotationData.clientName}
${quotationData.clientCompany}
${quotationData.clientAddress}

ITEMS:
${quotationData.items.map(item => 
          `${item.description} - Qty: ${item.quantity} - Price: ₹${item.unitPrice} - Total: ₹${item.total}`
).join('\n')}

TOTAL: ₹${quotationData.totalAmount.toFixed(2)}
    `
    
    const blob = new Blob([exportData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quotation-${quotationData.quotationNumber}.txt`
    a.click()
    
    setIsLoading(false)
  }

  const filteredItems = quotationData.items.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  React.useEffect(() => {
    calculateTotals()
  }, [calculateTotals])

  // Use isAreaWise and rooms from propQuotationData if provided
  const isAreaWise = propQuotationData?.isAreaWise;
  const rooms = propQuotationData?.rooms;

  return (
    <TooltipProvider>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        <div className="bg-background text-foreground p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Online Quotation</h1>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={isDarkMode}
                    onCheckedChange={handleDarkModeToggle}
                  />
                </div>
                
                <Badge className={statusColors[quotationData.status]}>
                  {quotationData.status.charAt(0).toUpperCase() + quotationData.status.slice(1)}
                </Badge>
                
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "destructive" : "default"}
                  className="gap-2"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
                
                <Button onClick={exportQuotation} disabled={isLoading} className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Loading Progress */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  {uploadProgress < 100 ? 'Processing...' : 'Complete!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Company & Client Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={quotationData.companyLogo} />
                          <AvatarFallback>
                            <Building2 className="w-8 h-8" />
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute -bottom-2 -right-2 w-8 h-8 p-0"
                            onClick={() => logoInputRef.current?.click()}
                          >
                            <Upload className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div>
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input
                            id="companyName"
                            value={quotationData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            disabled={!isEditing}
                            className={errors.companyName ? 'border-red-500' : ''}
                          />
                          {errors.companyName && (
                            <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyAddress">Address</Label>
                        <Textarea
                          id="companyAddress"
                          value={quotationData.companyAddress}
                          onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="companyPhone">Phone</Label>
                          <Input
                            id="companyPhone"
                            value={quotationData.companyPhone}
                            onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="companyEmail">Email</Label>
                          <Input
                            id="companyEmail"
                            type="email"
                            value={quotationData.companyEmail}
                            onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Client Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Client Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="clientName">Client Name</Label>
                        <Input
                          id="clientName"
                          value={quotationData.clientName}
                          onChange={(e) => handleInputChange('clientName', e.target.value)}
                          disabled={!isEditing}
                          className={errors.clientName ? 'border-red-500' : ''}
                        />
                        {errors.clientName && (
                          <p className="text-sm text-red-500 mt-1">{errors.clientName}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="clientCompany">Company</Label>
                        <Input
                          id="clientCompany"
                          value={quotationData.clientCompany}
                          onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="clientAddress">Address</Label>
                        <Textarea
                          id="clientAddress"
                          value={quotationData.clientAddress}
                          onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="clientPhone">Phone</Label>
                          <Input
                            id="clientPhone"
                            value={quotationData.clientPhone}
                            onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="clientEmail">Email</Label>
                          <Input
                            id="clientEmail"
                            type="email"
                            value={quotationData.clientEmail}
                            onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Items Table */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Quotation Items
                      </CardTitle>
                      
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-48"
                          />
                        </div>
                        
                        <Select value={filterCategory} onValueChange={setFilterCategory}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {isEditing && (
                          <Button
                            onClick={() => {
                              setEditingItem({
                                id: '',
                                description: '',
                                size: '',
                                surface: '',
                                actualSqftPerBox: 0,
                                billedSqftPerBox: 0,
                                sqftNeeded: 0,
                                boxNeeded: 0,
                                quantity: 1,
                                unitPrice: 0,
                                pricePerBox: 0,
                                discount: 0,
                                total: 0,
                                margin: 0,
                                marginPercentage: 0,
                                category: 'Other'
                              })
                              setIsItemDialogOpen(true)
                            }}
                            className="gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Item
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {errors.items && (
                      <Alert className="mb-4">
                        <AlertDescription>{errors.items}</AlertDescription>
                      </Alert>
                    )}
                    
                    {/* Quotation Items Table */}
                    <div className="hidden md:block">
                      <Table className="w-full text-xs">
                        <TableHeader>
                          <TableRow>
                            {/* Product Image Column */}
                            {quotationData.includeImages && (
                              <TableHead className="px-2 py-1 whitespace-nowrap">Image</TableHead>
                            )}
                            <TableHead className="px-2 py-1 whitespace-nowrap">Name</TableHead>
                            <TableHead className="px-2 py-1 whitespace-nowrap">Size</TableHead>
                            <TableHead className="px-2 py-1 whitespace-nowrap">Surface</TableHead>
                            {quotationData.showSqftInBox && (
                              <TableHead className="text-xs px-2 py-1 whitespace-nowrap">SQFT in Box ({quotationData.sqftInBoxType})</TableHead>
                            )}
                            {quotationData.showSqftNeeded && <TableHead className="text-xs px-2 py-1 whitespace-nowrap">SQFT Needed</TableHead>}
                            {quotationData.showBoxNeeded && <TableHead className="text-xs px-2 py-1 whitespace-nowrap">Box Needed</TableHead>}
                            <TableHead className="text-xs px-2 py-1 whitespace-nowrap text-right">Qty</TableHead>
                            {quotationData.showPricePerSqft && <TableHead className="text-xs px-2 py-1 whitespace-nowrap text-right">Price/SQFT</TableHead>}
                            {quotationData.showPricePerBox && <TableHead className="text-xs px-2 py-1 whitespace-nowrap text-right">Price/Box</TableHead>}
                            {quotationData.showAmount && <TableHead className="text-xs px-2 py-1 whitespace-nowrap text-right">Amount</TableHead>}
                            {quotationData.showMargin && <TableHead className="text-xs px-2 py-1 whitespace-nowrap text-right">Margin</TableHead>}
                            {isEditing && <TableHead className="text-xs px-2 py-1 whitespace-nowrap text-center">Actions</TableHead>}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {isAreaWise && rooms && rooms.length > 0
                            ? rooms.map((room, roomIdx) => (
                                <React.Fragment key={roomIdx}>
                                  <TableRow>
                                    <TableCell colSpan={8} className="bg-blue-50 font-semibold text-blue-800 text-sm px-2 py-1">
                                      {room.room_name}
                                    </TableCell>
                                  </TableRow>
                                  {room.items.map((item, idx) => (
                                    <TableRow key={item.id || idx}>
                                      {/* Product Image Cell */}
                                      {quotationData.includeImages && (
                                        <TableCell className="px-2 py-1 whitespace-nowrap">
                                          {item.imageUrl ? (
                                            <img
                                              src={item.imageUrl}
                                              alt={item.description}
                                              className="h-12 w-12 object-contain rounded shadow bg-gray-50"
                                              style={{ maxWidth: 48, maxHeight: 48 }}
                                            />
                                          ) : null}
                                        </TableCell>
                                      )}
                                      <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.description}</TableCell>
                                      <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.size}</TableCell>
                                      <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.surface}</TableCell>
                                      {quotationData.showSqftInBox && (
                                        <TableCell className="text-xs px-2 py-1 whitespace-nowrap">
                                          {quotationData.sqftInBoxType === 'actual'
                                            ? item.actualSqftPerBox
                                            : item.billedSqftPerBox}
                                        </TableCell>
                                      )}
                                      {quotationData.showSqftNeeded && <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.sqftNeeded}</TableCell>}
                                      {quotationData.showBoxNeeded && <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.boxNeeded}</TableCell>}
                                      <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.quantity}</TableCell>
                                      {quotationData.showPricePerSqft && (
                                        <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.unitPrice}</TableCell>
                                      )}
                                      {quotationData.showPricePerBox && (
                                        <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.pricePerBox}</TableCell>
                                      )}
                                      {quotationData.showAmount && (
                                        <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.total}</TableCell>
                                      )}
                                      {quotationData.showMargin && (
                                        <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.margin}</TableCell>
                                      )}
                                      {isEditing && (
                                        <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-center">
                                          <div className="flex items-center justify-center gap-2">
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                  onClick={() => {
                                                    setEditingItem(item)
                                                    setIsItemDialogOpen(true)
                                                  }}
                                                >
                                                  <Edit3 className="w-3 h-3" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>Edit item</TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                  onClick={() => deleteItem(item.id)}
                                                >
                                                  <Trash2 className="w-3 h-3" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>Delete item</TooltipContent>
                                            </Tooltip>
                                          </div>
                                        </TableCell>
                                      )}
                                    </TableRow>
                                  ))}
                                  <TableRow>
                                    <TableCell colSpan={8} className="bg-blue-100 text-right font-semibold text-blue-900 text-xs px-2 py-1">
                                      Subtotal: ₹{room.items.reduce((sum, item) => sum + (item.total || 0), 0).toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              ))
                            : quotationData.items.map((item, idx) => (
                                <TableRow key={item.id || idx}>
                                  {/* Product Image Cell */}
                                  {quotationData.includeImages && (
                                    <TableCell className="px-2 py-1 whitespace-nowrap">
                                      {item.imageUrl ? (
                                        <img
                                          src={item.imageUrl}
                                          alt={item.description}
                                          className="h-12 w-12 object-contain rounded shadow bg-gray-50"
                                          style={{ maxWidth: 48, maxHeight: 48 }}
                                        />
                                      ) : null}
                                    </TableCell>
                                  )}
                                  <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.description}</TableCell>
                                  <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.size}</TableCell>
                                  <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.surface}</TableCell>
                                  {quotationData.showSqftInBox && (
                                    <TableCell className="text-xs px-2 py-1 whitespace-nowrap">
                                      {quotationData.sqftInBoxType === 'actual'
                                        ? item.actualSqftPerBox
                                        : item.billedSqftPerBox}
                                    </TableCell>
                                  )}
                                  {quotationData.showSqftNeeded && <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.sqftNeeded}</TableCell>}
                                  {quotationData.showBoxNeeded && <TableCell className="text-xs px-2 py-1 whitespace-nowrap">{item.boxNeeded}</TableCell>}
                                  <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.quantity}</TableCell>
                                  {quotationData.showPricePerSqft && (
                                    <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.unitPrice}</TableCell>
                                  )}
                                  {quotationData.showPricePerBox && (
                                    <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.pricePerBox}</TableCell>
                                  )}
                                  {quotationData.showAmount && (
                                    <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.total}</TableCell>
                                  )}
                                  {quotationData.showMargin && (
                                    <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-right">{item.margin}</TableCell>
                                  )}
                                  {isEditing && (
                                    <TableCell className="text-xs px-2 py-1 whitespace-nowrap text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => {
                                                setEditingItem(item)
                                                setIsItemDialogOpen(true)
                                              }}
                                            >
                                              <Edit3 className="w-3 h-3" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Edit item</TooltipContent>
                                        </Tooltip>
                                        
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => deleteItem(item.id)}
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Delete item</TooltipContent>
                                        </Tooltip>
                                      </div>
                                    </TableCell>
                                  )}
                                </TableRow>
                              ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                      <AnimatePresence>
                        {isAreaWise && rooms && rooms.length > 0
                          ? rooms.map((room, roomIdx) => (
                              <div key={roomIdx} className="mb-6">
                                <div className="font-semibold text-blue-800 text-base mb-2">{room.room_name}</div>
                                {room.items.map((item, index) => (
                                  <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors mb-3"
                                  >
                                    {/* Product Image */}
                                    {quotationData.includeImages && item.imageUrl && (
                                      <div className="w-full flex justify-center mb-2">
                                        <img
                                          src={item.imageUrl}
                                          alt={item.description}
                                          className="max-h-32 object-contain rounded shadow"
                                          style={{ background: '#f9f9f9', maxWidth: '100%' }}
                                        />
                                      </div>
                                    )}
                                    {/* Product Info */}
                                    <div className="mb-2">
                                      <h4 className="font-medium text-base mb-1">{item.description}</h4>
                                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Size:</span>
                                        <span>{item.size}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Surface:</span>
                                        <span>{item.surface}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Qty:</span>
                                        <span>{item.quantity}</span>
                                      </div>
                                    </div>
                                    {(quotationData.showSqftInBox || quotationData.showSqftNeeded || quotationData.showBoxNeeded) && (
                                      <div className="border-t pt-2 mt-2">
                                        <div className="font-semibold text-xs text-muted-foreground mb-1">Area & Packing</div>
                                        {quotationData.showSqftInBox && (
                                          <div className="flex justify-between text-sm">
                                            <span>SQFT/Box ({quotationData.sqftInBoxType}):</span>
                                            <span>{quotationData.sqftInBoxType === 'actual' ? item.actualSqftPerBox : item.billedSqftPerBox}</span>
                                          </div>
                                        )}
                                        {quotationData.showSqftNeeded && (
                                          <div className="flex justify-between text-sm">
                                            <span>SQFT Needed:</span>
                                            <span>{item.sqftNeeded}</span>
                                          </div>
                                        )}
                                        {quotationData.showBoxNeeded && (
                                          <div className="flex justify-between text-sm">
                                            <span>Box Needed:</span>
                                            <span>{item.boxNeeded}</span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    {(quotationData.showPricePerSqft || quotationData.showPricePerBox || quotationData.showAmount) && (
                                      <div className="border-t pt-2 mt-2">
                                        <div className="font-semibold text-xs text-muted-foreground mb-1">Pricing</div>
                                        {quotationData.showPricePerSqft && (
                                          <div className="flex justify-between text-sm">
                                            <span>Unit Price:</span>
                                            <span>₹{item.unitPrice.toFixed(2)}</span>
                                          </div>
                                        )}
                                        {quotationData.showPricePerBox && (
                                          <div className="flex justify-between text-sm">
                                            <span>Price/Box:</span>
                                            <span>₹{item.pricePerBox.toFixed(2)}</span>
                                          </div>
                                        )}
                                        {quotationData.showAmount && (
                                          <div className="flex justify-between text-sm">
                                            <span className="font-medium">Total:</span>
                                            <span className="font-semibold">₹{item.total.toFixed(2)}</span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    {(quotationData.showMargin || item.discount) && (
                                      <div className="border-t pt-2 mt-2">
                                        <div className="font-semibold text-xs text-muted-foreground mb-1">Margin & Discount</div>
                                        {quotationData.showMargin && (
                                          <div className="flex justify-between text-sm">
                                            <span>Margin:</span>
                                            <span>₹{item.margin.toFixed(2)} ({item.marginPercentage.toFixed(1)}%)</span>
                                          </div>
                                        )}
                                        {item.discount ? (
                                          <div className="flex justify-between text-sm">
                                            <span>Discount:</span>
                                            <span>{item.discount}%</span>
                                          </div>
                                        ) : null}
                                      </div>
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            ))
                          : paginatedItems.map((item, index) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                                className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
                              >
                                {/* Product Image */}
                                {quotationData.includeImages && item.imageUrl && (
                                  <div className="w-full flex justify-center mb-2">
                                    <img
                                      src={item.imageUrl}
                                      alt={item.description}
                                      className="max-h-32 object-contain rounded shadow"
                                      style={{ background: '#f9f9f9', maxWidth: '100%' }}
                                    />
                                  </div>
                                )}
                                {/* Product Info */}
                                <div className="mb-2">
                                  <h4 className="font-medium text-base mb-1">{item.description}</h4>
                                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Size:</span>
                                    <span>{item.size}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Surface:</span>
                                    <span>{item.surface}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Qty:</span>
                                    <span>{item.quantity}</span>
                                  </div>
                                </div>
                                {(quotationData.showSqftInBox || quotationData.showSqftNeeded || quotationData.showBoxNeeded) && (
                                  <div className="border-t pt-2 mt-2">
                                    <div className="font-semibold text-xs text-muted-foreground mb-1">Area & Packing</div>
                                    {quotationData.showSqftInBox && (
                                      <div className="flex justify-between text-sm">
                                        <span>SQFT/Box ({quotationData.sqftInBoxType}):</span>
                                        <span>{quotationData.sqftInBoxType === 'actual' ? item.actualSqftPerBox : item.billedSqftPerBox}</span>
                                      </div>
                                    )}
                                    {quotationData.showSqftNeeded && (
                                      <div className="flex justify-between text-sm">
                                        <span>SQFT Needed:</span>
                                        <span>{item.sqftNeeded}</span>
                                      </div>
                                    )}
                                    {quotationData.showBoxNeeded && (
                                      <div className="flex justify-between text-sm">
                                        <span>Box Needed:</span>
                                        <span>{item.boxNeeded}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                                {(quotationData.showPricePerSqft || quotationData.showPricePerBox || quotationData.showAmount) && (
                                  <div className="border-t pt-2 mt-2">
                                    <div className="font-semibold text-xs text-muted-foreground mb-1">Pricing</div>
                                    {quotationData.showPricePerSqft && (
                                      <div className="flex justify-between text-sm">
                                        <span>Unit Price:</span>
                                        <span>₹{item.unitPrice.toFixed(2)}</span>
                                      </div>
                                    )}
                                    {quotationData.showPricePerBox && (
                                      <div className="flex justify-between text-sm">
                                        <span>Price/Box:</span>
                                        <span>₹{item.pricePerBox.toFixed(2)}</span>
                                      </div>
                                    )}
                                    {quotationData.showAmount && (
                                      <div className="flex justify-between text-sm">
                                        <span className="font-medium">Total:</span>
                                        <span className="font-semibold">₹{item.total.toFixed(2)}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                                {(quotationData.showMargin || item.discount) && (
                                  <div className="border-t pt-2 mt-2">
                                    <div className="font-semibold text-xs text-muted-foreground mb-1">Margin & Discount</div>
                                    {quotationData.showMargin && (
                                      <div className="flex justify-between text-sm">
                                        <span>Margin:</span>
                                        <span>₹{item.margin.toFixed(2)} ({item.marginPercentage.toFixed(1)}%)</span>
                                      </div>
                                    )}
                                    {item.discount ? (
                                      <div className="flex justify-between text-sm">
                                        <span>Discount:</span>
                                        <span>{item.discount}%</span>
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                              </motion.div>
                            ))}
                      </AnimatePresence>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                          Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                          {Math.min(currentPage * itemsPerPage, filteredItems.length)} of{' '}
                          {filteredItems.length} items
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          
                          <span className="text-sm">
                            Page {currentPage} of {totalPages}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Notes and Terms */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Notes & Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={quotationData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        placeholder="Additional notes or comments..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="terms">Terms & Conditions</Label>
                      <Textarea
                        id="terms"
                        value={quotationData.terms}
                        onChange={(e) => handleInputChange('terms', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        placeholder="Payment terms, delivery conditions, etc..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Quotation Details & Summary */}
            <div className="space-y-6">
              {/* Quotation Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Quotation Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="quotationNumber">Quotation Number</Label>
                      <Input
                        id="quotationNumber"
                        value={quotationData.quotationNumber}
                        onChange={(e) => handleInputChange('quotationNumber', e.target.value)}
                        disabled={!isEditing}
                        className={errors.quotationNumber ? 'border-red-500' : ''}
                      />
                      {errors.quotationNumber && (
                        <p className="text-sm text-red-500 mt-1">{errors.quotationNumber}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={quotationData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="validUntil">Valid Until</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        value={quotationData.validUntil}
                        onChange={(e) => handleInputChange('validUntil', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={quotationData.status}
                        onValueChange={(value) => handleInputChange('status', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="sent">Sent</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{quotationData.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax Amount:</span>
                      <span>₹{quotationData.taxAmount.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span>₹{quotationData.totalAmount.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Attachments */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Attachments</span>
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {quotationData.attachments.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">
                        No attachments
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {quotationData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm truncate">{file.name}</span>
                            {isEditing && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setQuotationData(prev => ({
                                    ...prev,
                                    attachments: prev.attachments.filter((_, i) => i !== index)
                                  }))
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Product Images */}
              {quotationData.includeImages && quotationData.items.filter(item => item.imageUrl).length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-base mb-2">Product Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {quotationData.items.filter(item => item.imageUrl).map((item, idx) => (
                      <div key={item.id || idx} className="flex flex-col items-center border rounded p-2 bg-muted/50">
                        <img
                          src={item.imageUrl}
                          alt={item.description}
                          className="h-20 w-20 object-contain rounded shadow mb-2 bg-gray-50"
                          style={{ maxWidth: 80, maxHeight: 80 }}
                        />
                        <div className="text-xs font-medium text-center truncate w-full" title={item.description}>{item.description}</div>
                        <div className="text-xs text-muted-foreground text-center">{item.size}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <Button
                        onClick={() => {
                          if (validateForm()) {
                            setIsEditing(false)
                            // Here you would typically save to backend
                          }
                        }}
                        className="w-full gap-2"
                        disabled={isLoading}
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>

          {/* Hidden File Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e, 'attachment')}
            className="hidden"
          />
          
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'logo')}
            className="hidden"
          />

          {/* Item Dialog */}
          <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem?.id ? 'Edit Item' : 'Add New Item'}
                </DialogTitle>
              </DialogHeader>
              
              {editingItem && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="itemDescription">Description</Label>
                    <Input
                      id="itemDescription"
                      value={editingItem.description}
                      onChange={(e) => handleItemChange('description', e.target.value)}
                      className={errors.itemDescription ? 'border-red-500' : ''}
                    />
                    {errors.itemDescription && (
                      <p className="text-sm text-red-500 mt-1">{errors.itemDescription}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="itemCategory">Category</Label>
                    <Select
                      value={editingItem.category}
                      onValueChange={(value) => handleItemChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="itemQuantity">Quantity</Label>
                      <Input
                        id="itemQuantity"
                        type="number"
                        value={editingItem.quantity}
                        onChange={(e) => handleItemChange('quantity', parseInt(e.target.value) || 0)}
                        min="1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="itemUnitPrice">Unit Price</Label>
                      <Input
                        id="itemUnitPrice"
                        type="number"
                        value={editingItem.unitPrice}
                        onChange={(e) => handleItemChange('unitPrice', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="itemDiscount">Discount (%)</Label>
                    <Input
                      id="itemDiscount"
                      type="number"
                      value={editingItem.discount}
                      onChange={(e) => handleItemChange('discount', parseFloat(e.target.value) || 0)}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                  
                  <div className="p-3 bg-muted rounded">
                    <div className="flex justify-between text-sm">
                      <span>Total:</span>
                      <span className="font-semibold">₹{editingItem.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={addOrUpdateItem} className="flex-1">
                      {editingItem.id ? 'Update' : 'Add'} Item
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingItem(null)
                        setIsItemDialogOpen(false)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default OnlineQuotationComponent