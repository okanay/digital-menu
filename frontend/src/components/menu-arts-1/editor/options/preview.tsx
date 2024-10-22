import { ModalExplanation } from "@/components/ui/modal-explanation";
import { Link } from "@/i18n/routing";
import { Eye } from "lucide-react";
import { useParams } from "next/navigation";

export const MenuEditorPreview: React.FC = () => {
  const params = useParams();

  return (
    <div className="relative inline-block">
      <div className="group">
        <ModalExplanation>View Menu</ModalExplanation>
        <Link
          href={`/${params.id}`}
          target="_blank"
          className="group inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 active:scale-95 disabled:cursor-not-allowed"
        >
          <Eye
            className={`size-5 text-black transition-all duration-300 group-disabled:text-gray-300 dark:text-white dark:group-disabled:text-gray-600`}
          />
        </Link>
      </div>
    </div>
  );
};
