import { CheckCircle2, XCircle, AlertTriangle, Info, Loader2 } from "lucide-react";
import type { ToastRecord } from "@/design-system/components/toast/types/toast.types";

const VARIANT_ICON_MAP: Record<ToastRecord["variant"], React.ReactNode> = {
  success: <CheckCircle2 size={20} />,
  error: <XCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
  loading: <Loader2 size={20} className={"animate-spin"} />,
  custom: null,
};

export function ToastIcon({ record }: { record: ToastRecord }) {
  const resolved = record.icon ?? VARIANT_ICON_MAP[record.variant];
  if (!resolved) return null;
  return <span data-toast-icon={record.variant}>{resolved}</span>;
}
