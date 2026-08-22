import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { SITE_NAME } from "@/lib/constants";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#111111" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  siteName: { fontSize: 18, fontWeight: 700 },
  muted: { color: "#666666" },
  section: { marginBottom: 16 },
  label: { fontSize: 9, color: "#666666", textTransform: "uppercase", marginBottom: 2 },
  table: { marginTop: 8, borderTop: "1 solid #dddddd" },
  tableRow: { flexDirection: "row", paddingVertical: 6, borderBottom: "1 solid #eeeeee" },
  tableHeaderRow: { flexDirection: "row", paddingVertical: 6, borderBottom: "1 solid #111111" },
  col1: { flex: 3 },
  col2: { flex: 1, textAlign: "right" },
  col3: { flex: 1, textAlign: "right" },
  col4: { flex: 1, textAlign: "right" },
  totals: { marginTop: 12, alignSelf: "flex-end", width: 200 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 2 },
  grandTotal: { fontSize: 12, fontWeight: 700, borderTop: "1 solid #111111", paddingTop: 6, marginTop: 4 },
});

export type InvoiceOrder = {
  id: string;
  createdAt: Date;
  subtotal: number;
  discount: number;
  total: number;
  shippingName: string;
  shippingLine1: string;
  shippingLine2: string | null;
  shippingCity: string;
  shippingState: string;
  shippingPostal: string;
  shippingCountry: string;
  items: {
    id: string;
    widthIn: number;
    heightIn: number;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    product: { name: string };
    materialOption: { label: string } | null;
  }[];
};

export function InvoiceDocument({ order, customerEmail }: { order: InvoiceOrder; customerEmail: string }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.siteName}>{SITE_NAME}</Text>
            <Text style={styles.muted}>Custom Printing & Display Products</Text>
          </View>
          <View>
            <Text>Invoice #{order.id.slice(-8).toUpperCase()}</Text>
            <Text style={styles.muted}>{order.createdAt.toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bill To</Text>
          <Text>{order.shippingName}</Text>
          <Text>{customerEmail}</Text>
          <Text>{order.shippingLine1}</Text>
          {order.shippingLine2 && <Text>{order.shippingLine2}</Text>}
          <Text>
            {order.shippingCity}, {order.shippingState} {order.shippingPostal}
          </Text>
          <Text>{order.shippingCountry}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.col1}>Item</Text>
            <Text style={styles.col2}>Qty</Text>
            <Text style={styles.col3}>Unit Price</Text>
            <Text style={styles.col4}>Total</Text>
          </View>
          {order.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.col1}>
                {item.product.name} ({item.widthIn}&quot; x {item.heightIn}&quot;
                {item.materialOption ? `, ${item.materialOption.label}` : ""})
              </Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>${item.unitPrice.toFixed(2)}</Text>
              <Text style={styles.col4}>${item.lineTotal.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalsRow}>
            <Text>Subtotal</Text>
            <Text>${order.subtotal.toFixed(2)}</Text>
          </View>
          {order.discount > 0 && (
            <View style={styles.totalsRow}>
              <Text>Discount</Text>
              <Text>-${order.discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={[styles.totalsRow, styles.grandTotal]}>
            <Text>Total</Text>
            <Text>${order.total.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
