import { Calendar, Menu, ArrowRight } from "lucide-react";
import { FormatDate } from "@/utils/form-date";
import { Link } from "@/i18n/routing";
import { CardConfig } from "./config";
import { CardStatus } from "./ui/status";

interface Props {
  shop: Shop;
}

export const ShopCard: React.FC<Props> = ({ shop }) => {
  return (
    <div className="group relative overflow-hidden rounded border border-corner/10 shadow transition-all duration-300">
      <div className="relative px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-custom-serif text-2xl uppercase tracking-tight text-primary-500/80 transition-colors duration-300">
              {shop.name}
            </h2>
            <p className="mt-1 font-custom-mono text-xs uppercase text-font-secondary">
              {shop.uniqueId}
            </p>
          </div>
          <div className="flex gap-2 text-xs tracking-wide">
            <CardStatus isActive={shop.isActive} />
            <CardConfig shop={shop} />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 font-custom-mono text-sm">
          <div className="flex items-center gap-2 text-font-secondary">
            <Menu className="size-5 text-primary-500" />
            <span>{shop.menuCount} Menü</span>
          </div>
          <div className="flex items-center gap-2 text-font-secondary">
            <Calendar className="size-5 text-primary-500" />
            <span>{FormatDate(shop.createdAt)}</span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-start gap-4 border-t border-corner/10 pt-4">
          <Link
            href={{
              pathname: "/menus",
              query: { id: shop.uniqueId },
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 transition-all duration-300 hover:text-primary-600 active:scale-95"
          >
            Show Menus
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
