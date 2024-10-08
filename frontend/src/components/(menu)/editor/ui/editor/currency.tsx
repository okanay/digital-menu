import useClickOutside from "@/hooks/use-click-outside";
import { useCallback, useState } from "react";
import { useMenuEditor } from "../../use-menu-editor";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { CurrencyDictionary } from "../currency-dictionary";
import { CircleDollarSign } from "lucide-react";

export const MenuCurrency = () => {
  const [open, setOpen] = useState(false);
  const { menu, currency } = useMenuEditor();
  const { currencies, current } = menu.currency;
  const { setCurrency } = currency;

  const handleClose = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(handleClose, open);

  return (
    <div ref={ref} className="relative inline-block">
      <div className="group">
        <ModalExplanation>Currency Settings</ModalExplanation>
        <button
          className="inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 hover:opacity-75 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={() => setOpen(!open)}
        >
          <CircleDollarSign className="size-5 text-black dark:text-white" />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 z-[110] mt-1.5 w-16 origin-top-right">
          <div className="flex flex-col gap-2 rounded border border-corner/10 bg-fill py-1 text-sm">
            {currencies.map((currency) => (
              <CurrencyItem
                key={currency + "-currency"}
                current={current}
                currency={currency}
                setCurrency={setCurrency}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CurrencyItem {
  current: Currency;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyItem = ({ current, currency, setCurrency }: CurrencyItem) => {
  return (
    <div className="flex cursor-pointer items-center justify-between px-2 hover:bg-primary-100 dark:hover:bg-primary-800">
      <button className="flex w-full items-center gap-2">
        <CurrencyDictionary currency={currency} />
      </button>
      <input
        type="checkbox"
        checked={current === currency}
        onChange={() => setCurrency(currency)}
        className="form-checkbox h-4 w-4 text-primary-600"
      />
    </div>
  );
};
