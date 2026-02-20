// Simple in-memory order store for bridging checkout → webhook
// Orders only need to persist ~30 minutes. Fine for MVP on Vercel.
// Vercel serverless functions share memory within the same instance,
// but NOT across cold starts. For production, upgrade to KV/DB.

export interface OrderData {
  name: string;
  analysis: Record<string, unknown>;
  palette: string;
  artUrl?: string;
  imageryStyle?: string;
  createdAt: number;
}

const orders = new Map<string, OrderData>();

// Clean up orders older than 1 hour
function cleanup() {
  const cutoff = Date.now() - 60 * 60 * 1000;
  orders.forEach((order, id) => {
    if (order.createdAt < cutoff) {
      orders.delete(id);
    }
  });
}

export function storeOrder(id: string, data: Omit<OrderData, "createdAt">) {
  cleanup();
  orders.set(id, { ...data, createdAt: Date.now() });
}

export function getOrder(id: string): OrderData | undefined {
  return orders.get(id);
}

export function deleteOrder(id: string) {
  orders.delete(id);
}
