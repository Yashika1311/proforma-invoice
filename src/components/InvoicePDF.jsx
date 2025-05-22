import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../assets/images/logo.jpeg';


const styles = StyleSheet.create({
  page: {
    padding: 8,
    fontSize: 8,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: '#f5f8f3',
    padding: 6,
    borderRadius: 5,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#2E4D1C', // Indigo color for company name
  },
  logo: {
    width: 40,
    height: 40,
  },
  addressBlock: {
    marginBottom: 8,
    textAlign: 'center',
    backgroundColor: '#f5f8f3',
    padding: 6,
    borderRadius: 4,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#93C572',
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  registrationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#93C572',
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2E4D1C', // Indigo for title
  },
  subtitle: {
    fontSize: 12,
    color: '#93C572', // Medium purple for subtitle
    marginBottom: 5,
  },
  invoiceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#93C572',
    padding: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  invoiceDetails: {
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#93C572',
    paddingBottom: 5,
    backgroundColor: '#f5f8f3',
    padding: 8,
    borderRadius: 4,
  },
  partyDetails: {
    marginBottom: 6,
    backgroundColor: '#f5f8f3',
    padding: 6,
    borderRadius: 4,
  },
  workOrderBox: {
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#f5f8f3',
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#93C572',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressColumn: {
    flex: 1,
    marginRight: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  table: {
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f5f8f3',
    padding: 3,
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#93C572',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 3,
    minHeight: 20,
    backgroundColor: '#FFFFFF',
  },
  srNo: {
    width: '5%',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 4,
  },
  productDesc: {
    width: '40%',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 4,
  },
  unit: {
    width: '8%',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 4,
  },
  qty: {
    width: '8%',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 4,
  },
  taxableValue: {
    width: '13%',
    textAlign: 'right',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 4,
  },
  cgstSgst: {
    width: '13%',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 4,
  },
  amount: {
    width: '13%',
    textAlign: 'right',
    padding: 4,
  },
  totals: {
    marginTop: 5,
    borderTop: 1,
    borderTopColor: '#000',
    paddingTop: 5,
    backgroundColor: '#f5f8f3',
    padding: 5,
    borderRadius: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
    backgroundColor: '#f5f8f3',
    padding: 4,
  },
  totalLabel: {
    width: 200,
    textAlign: 'right',
    marginRight: 10,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  amountInWords: {
    marginTop: 5,
    marginBottom: 10,
    fontStyle: 'italic',
    backgroundColor: '#f5f8f3',
    padding: 5,
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },
  bankDetails: {
    marginTop: 4,
    borderTop: 1,
    borderTopColor: '#93C572',
    paddingTop: 2,
    backgroundColor: '#f5f8f3',
    padding: 3,
    borderRadius: 4,
  },
  bankRow: {
    marginBottom: 1,
    paddingLeft: 3,
  },
  signature: {
    marginTop: 4,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#2E4D1C',
    borderTop: 1,
    borderTopColor: '#93C572',
    paddingTop: 2,
  },
  stamp: {
    width: 50,
    height: 50,
    marginTop: 4,
    alignSelf: 'flex-end',
    opacity: 0.9
  },
});

const InvoicePDF = ({ data }) => {
  if (!data || !data.items || !Array.isArray(data.items)) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Error: Invalid invoice data</Text>
        </Page>
      </Document>
    );
  }

  const calculateTotal = () => {
    return data.items.reduce((acc, item) => {
      const taxableValue = parseFloat(item.taxableValue) || 0;
      const taxAmount = parseFloat(item.taxAmount) || 0;
      const amount = parseFloat(item.amount) || 0;
      
      return {
        taxableValue: acc.taxableValue + taxableValue,
        taxAmount: acc.taxAmount + taxAmount,
        total: acc.total + amount
      };
    }, { taxableValue: 0, taxAmount: 0, total: 0 });
  };

  const totals = calculateTotal();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Company Header */}
        <View style={styles.headerTop}>
        <Image 
            src={logo} 
            style={styles.logo} 
          />
          <Text style={styles.companyName}>SHREE VARATHI TRADERS</Text>
        </View>
        {/* Address */}
        <View style={styles.addressBlock}>
          <Text>Plot no.G-32/5,Supreme Fabricators,ADD.M.I.D.C</Text>
          <Text>Behind Godawoon,Kudal M.I.D.C Sindhudurg,Maharashtra 416520</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.contactRow}>
          <Text>Email: infovarathitraders2024@gmail.com</Text>
          <Text>Mob - 9372392879</Text>
        </View>

        {/* Registration Numbers */}
        <View style={styles.registrationRow}>
          <Text>UDYAM REGISTRATION NUMBER - UDYAM-MH-31-0028109</Text>
          <Text>GSTIN:27ALFPG0568F1ZA </Text>
        </View>

        {/* Tax Invoice Title */}
        <Text style={styles.invoiceTitle}>PROFORMA INVOICE</Text>

        {/* Invoice Details */}
        <View style={styles.invoiceDetails}>
          <View style={styles.row}>
            <Text>Proforma Invoice No: {data.invoiceDetails.number}</Text>
            <Text>Proforma Invoice Date: {data.invoiceDetails.date}</Text>
          </View>
        </View>

        {/* Bill to Party */}
        <View style={styles.partyDetails}>
          <Text style={styles.label}>Bill to Party</Text>
          <Text>Name: {data.customerDetails.name || ''}</Text>
          <View style={styles.addressContainer}>
            <View style={styles.addressColumn}>
              <Text style={styles.boldText}>Billing Address:</Text>
              <Text>{data.customerDetails.billingAddress || ''}</Text>
            </View>
            {data.customerDetails.shippingAddress && (
              <View style={styles.addressColumn}>
                <Text style={styles.boldText}>Shipping Address:</Text>
                <Text>{data.customerDetails.shippingAddress}</Text>
              </View>
            )}
          </View>
          <View>
            <View style={styles.row}>
              {data.customerDetails.wo && (
                <Text><Text style={styles.boldText}>WO Number:</Text> {data.customerDetails.wo}</Text>
              )}
              {data.customerDetails.po && (
                <Text><Text style={styles.boldText}>PO Number:</Text> {data.customerDetails.po}</Text>
              )}
            </View>
            {data.customerDetails.workOrderDetails && (
              <View style={styles.workOrderBox}>
                <Text style={styles.boldText}>Work Order Details:</Text>
                <Text>{data.customerDetails.workOrderDetails}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.srNo}>SR. No.</Text>
            <Text style={styles.productDesc}>Product Description</Text>
            <Text style={styles.unit}>Unit</Text>
            <Text style={styles.qty}>Qty</Text>
            <Text style={styles.taxableValue}>Taxable Value</Text>
            <Text style={styles.cgstSgst}>CGST</Text>
            <Text style={styles.cgstSgst}>SGST</Text>
            <Text style={styles.amount}>Total</Text>
          </View>
          
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.srNo}>{index + 1}</Text>
              <Text style={styles.productDesc}>{item.description || ''}</Text>
              <Text style={styles.unit}>Nos</Text>
              <Text style={styles.qty}>{item.quantity || ''}</Text>
              <Text style={styles.taxableValue}>₹{item.taxableValue || '0'}</Text>
              <Text style={styles.cgstSgst}>{(parseFloat(item.taxRate || 0)/2).toFixed(1)}%</Text>
              <Text style={styles.cgstSgst}>{(parseFloat(item.taxRate || 0)/2).toFixed(1)}%</Text>
              <Text style={styles.amount}>₹{item.amount || '0'}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount before Tax</Text>
            <Text style={styles.totalValue}>₹{totals.taxableValue.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Add: GST</Text>
            <Text style={styles.totalValue}>₹{totals.taxAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Tax Amount</Text>
            <Text style={styles.totalValue}>₹{totals.taxAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount after Tax</Text>
            <Text style={styles.totalValue}>₹{totals.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Amount in Words */}
        <View style={styles.amountInWords}>
          <Text>Rupees: {data.amountInWords || totals.total.toFixed(2)} Only</Text>
        </View>

        {/* Bank Details */}
        <View style={styles.bankDetails}>
          <View style={styles.bankRow}>
            <Text>Bank Name:Bank of Baroda</Text>
          </View>
          <View style={styles.bankRow}>
            <Text>Account Number:84020200002440</Text>
          </View>
          <View style={styles.bankRow}>
            <Text>Bank IFSC: BARB0VJLONA</Text>
          </View> 
          {data.termsAndConditions && data.termsAndConditions.length > 0 && (
            <>
              <View style={styles.bankRow}>
                <Text>Terms & Conditions:</Text>
              </View>
              {data.termsAndConditions.map((term, index) => (
                <View key={index} style={styles.bankRow}>
                  <Text>{index + 1}. {term}</Text>
                </View>
              ))}
            </>
          )}
          
          {/* Stamp Image */}
          <Text style={styles.stamp} >Athorized Signatory</Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text>Shree Varathi Traders</Text>
        </View>

      </Page>
    </Document>
  );
};

export default InvoicePDF;
