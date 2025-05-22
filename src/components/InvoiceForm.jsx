import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Typography,
  IconButton,
  Input,
  Box,
  ThemeProvider,
  createTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';
import logo from '../assets/images/logo.jpeg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#93C572',
      light: '#a4d186',
      dark: '#7ba55c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f8f3',
      paper: '#ffffff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f8f3',
          padding: '24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#93C572',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-contained': {
            backgroundColor: '#93C572',
            '&:hover': {
              backgroundColor: '#7ba55c',
            },
          },
          '&.MuiButton-outlined': {
            borderColor: '#93C572',
            color: '#93C572',
            '&:hover': {
              borderColor: '#7ba55c',
              color: '#7ba55c',
            },
          },
        },
      },
    },
  },
});

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    companyDetails: {
      logoImage: logo
    },
    customerDetails: {
      name: '',
      billingAddress: '',
      wo: '',
      po: '',
      workOrderDetails: '',
      shippingAddress: ''
    },
    invoiceDetails: {
      number: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0]
    },
    items: [
      { description: '', hsn: '', rate: '', quantity: '', taxableValue: '', taxRate: '18', taxAmount: '', amount: '' }
    ],
    termsAndConditions: []
  });

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({
      ...prev,
      companyDetails: {
        ...prev.companyDetails,
        [name]: value
      }
    }));
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({
      ...prev,
      customerDetails: {
        ...prev.customerDetails,
        [name]: value
      }
    }));
  };


  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a copy of the file with a new name
      const newFile = new File([file], 'company-logo' + file.name.substring(file.name.lastIndexOf('.')), {
        type: file.type,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        // Save the image to assets/images folder
        const imageUrl = reader.result;
        setInvoiceData(prev => ({
          ...prev,
          companyDetails: {
            ...prev.companyDetails,
            logoImage: imageUrl
          }
        }));
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleInvoiceDetailsChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({
      ...prev,
      invoiceDetails: {
        ...prev.invoiceDetails,
        [name]: value
      }
    }));
  };

  const calculateItemTotals = (item) => {
    const quantity = parseFloat(item.quantity) || 0;
    const rate = parseFloat(item.rate) || 0;
    const taxRate = parseFloat(item.taxRate) || 0;
    
    const taxableValue = quantity * rate;
    const taxAmount = (taxableValue * taxRate) / 100;
    const amount = taxableValue + taxAmount;
    
    return {
      ...item,
      taxableValue: taxableValue.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      amount: amount.toFixed(2)
    };
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => {
      const newItems = [...prev.items];
      newItems[index] = {
        ...newItems[index],
        [name]: value
      };
      // Recalculate totals when rate, quantity, or tax rate changes
      if (['rate', 'quantity', 'taxRate'].includes(name)) {
        newItems[index] = calculateItemTotals(newItems[index]);
      }
      return {
        ...prev,
        items: newItems
      };
    });
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', hsn: '', rate: '', quantity: '', taxableValue: '', taxRate: '18', taxAmount: '', amount: '' }]
    }));
  };

  const removeItem = (index) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((acc, item) => {
      return {
        taxableValue: acc.taxableValue + (parseFloat(item.taxableValue) || 0),
        taxAmount: acc.taxAmount + (parseFloat(item.taxAmount) || 0),
        total: acc.total + (parseFloat(item.amount) || 0)
      };
    }, { taxableValue: 0, taxAmount: 0, total: 0 });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 3, sm: 4 } }}>
            <Box sx={{ width: { xs: 80, sm: 96 }, height: { xs: 80, sm: 96 }, position: 'relative' }}>
              <img 
                src={invoiceData.companyDetails.logoImage || logo} 
                alt="Company Logo" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  borderRadius: '50%',
                  border: '2px solid #93C572'
                }}
              />
              {invoiceData.companyDetails.logoImage && (
                <Box sx={{ position: 'absolute', top: 0, right: 0, mt: 1, mr: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => setInvoiceData(prev => ({
                      ...prev,
                      companyDetails: {
                        ...prev.companyDetails,
                        logoImage: null
                      }
                    }))}
                  >
                      <DeleteIcon sx={{ fontSize: '1.25rem' }} />
                  </IconButton>
                </Box>
            )}
          </Box>
          <Typography variant="subtitle2" className="text-right">ORIGINAL FOR RECIPIENT</Typography>
        </Box>

        {/* Terms and Conditions */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>Terms and Conditions</Typography>
            {invoiceData.termsAndConditions.map((term, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={term}
                  onChange={(e) => {
                    const newTerms = [...invoiceData.termsAndConditions];
                    newTerms[index] = e.target.value;
                    setInvoiceData(prev => ({
                      ...prev,
                      termsAndConditions: newTerms
                    }));
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => {
                    setInvoiceData(prev => ({
                      ...prev,
                      termsAndConditions: prev.termsAndConditions.filter((_, i) => i !== index)
                    }));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setInvoiceData(prev => ({
                  ...prev,
                  termsAndConditions: [...prev.termsAndConditions, '']
                }));
              }}
              sx={{ mt: 1 }}
            >
              Add Term
            </Button>
          </Grid>
        </Grid>

        {/* Invoice Details */}
        <div className="mb-6">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Invoice Number"
                name="number"
                value={invoiceData.invoiceDetails.number}
                onChange={handleInvoiceDetailsChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                label="Invoice Date"
                name="date"
                value={invoiceData.invoiceDetails.date}
                onChange={handleInvoiceDetailsChange}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </div>

        {/* Customer Details */}
        <div className="mb-4 sm:mb-6">
          <Typography variant="h6" className="mb-2 sm:mb-3 text-lg sm:text-xl">Customer Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Name"
                name="name"
                value={invoiceData.customerDetails.name}
                onChange={handleCustomerChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="WO Number"
                    name="wo"
                    value={invoiceData.customerDetails.wo}
                    onChange={handleCustomerChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="PO Number"
                    name="po"
                    value={invoiceData.customerDetails.po}
                    onChange={handleCustomerChange}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Work Order Details"
                    name="workOrderDetails"
                    multiline
                    rows={2}
                    value={invoiceData.customerDetails.workOrderDetails}
                    onChange={handleCustomerChange}
                    placeholder="Enter work order details (e.g., Installation of Solar system @ Siennaa Block 1)"
                    size="small"
                  />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Billing Address"
                name="billingAddress"
                value={invoiceData.customerDetails.billingAddress}
                onChange={handleCustomerChange}
                multiline
                rows={2}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Shipping Address"
                name="shippingAddress"
                value={invoiceData.customerDetails.shippingAddress}
                onChange={handleCustomerChange}
                multiline
                rows={2}
                size="small"
              />
            </Grid>
          </Grid>
        </div>

        {/* Items */}
        <div className="mb-4 sm:mb-6 overflow-x-auto">
          <Typography variant="h6" className="mb-2 sm:mb-3 text-lg sm:text-xl">Items</Typography>
          {invoiceData.items.map((item, index) => (
            <Box key={index} className="mb-4 p-4 border rounded">
              <Grid container spacing={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="HSN/SAC"
                    name="hsn"
                    value={item.hsn}
                    onChange={(e) => handleItemChange(index, e)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Rate"
                    name="rate"
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, e)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Tax Rate %"
                    name="taxRate"
                    type="number"
                    value={item.taxRate}
                    onChange={(e) => handleItemChange(index, e)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Amount"
                    value={item.amount}
                    disabled
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} className="flex justify-end">
                  <IconButton 
                    onClick={() => removeItem(index)} 
                    color="error"
                    sx={{ p: { xs: 1, sm: 1.5 } }}
                  >
                    <DeleteIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button 
            variant="outlined" 
            onClick={addItem} 
            fullWidth 
            sx={{ 
              mt: 2,
              py: { xs: 1.5, sm: 1 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Add Item
          </Button>
        </div>




        {/* Totals */}
        <div className="mb-6">
          <Typography variant="h6" className="mb-3">Summary</Typography>
          <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Typography className="text-sm sm:text-base">Taxable Amount: ₹{calculateTotal().taxableValue.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography className="text-sm sm:text-base">Tax Amount: ₹{calculateTotal().taxAmount.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" className="text-base sm:text-lg">Total: ₹{calculateTotal().total.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        </div>

        {/* Download Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 3, sm: 4 } }}>
          {invoiceData.items.length > 0 && (
            <PDFDownloadLink
              document={<InvoicePDF data={invoiceData} />}
              fileName="invoice.pdf"
              style={{ textDecoration: 'none', width: '100%', maxWidth: { sm: '300px' } }}
            >
              {({ blob, url, loading, error }) => {
                if (error) {
                  return (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        width: '100%',
                        py: { xs: 1.5, sm: 1 },
                        px: { xs: 2, sm: 3 },
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}
                    >
                      Error generating PDF
                    </Button>
                  );
                }
                return (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className="w-full text-sm sm:text-base py-3 sm:py-2 px-4 sm:px-6"
                  >
                    {loading ? 'Generating PDF...' : 'Download Invoice PDF'}
                  </Button>
                );
              }}
            </PDFDownloadLink>
          )}
        </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default InvoiceForm;
