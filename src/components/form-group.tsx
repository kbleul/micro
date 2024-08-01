import cn from "@/utils/class-names";
import { Title, Text } from "@/components/ui/text";
interface FormGroupProps {
  title: React.ReactNode;
  className?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function FormGroup({
  title,
  className,
  description,
  children,
}: FormGroupProps) {
  return (
    <div className={cn("grid gap-5 @3xl:grid-cols-12 pt-4", className)}>
      <div className="col-span-full @4xl:col-span-4">
        <h4 className="text-base font-medium">{title}</h4>
        {description && <p className="mt-2">{description}</p>}
      </div>
      {children && (
        <div className="col-span-full grid gap-3 @2xl:grid-cols-2 @4xl:col-span-8 @4xl:gap-4 xl:gap-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function FormBlockWrapper({
  title,
  description,
  children,
  className,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
}>) {
  return (
    <section className={cn("@5xl:grid @5xl:grid-cols-6", className)}>
      <header className="col-span-2 mb-4 @5xl:mb-0">
        <Title as="h5" className="font-semibold">
          {title}
        </Title>
        {description ? (
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        ) : null}
      </header>
      <div className="col-span-4 grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5">
        {children}
      </div>
    </section>
  );
}
