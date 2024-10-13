type Props = {
  id: string;
  locale: string;
};

export default function ShopPage({ id, locale }: Props) {
  return (
    <div>
      <p>Restaurant ID: {id}</p>
    </div>
  );
}
