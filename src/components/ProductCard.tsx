import { Product } from "@/db/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { add } from "@/features/cart/cartSlice";
import { Rating } from "./Rating";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  function addToCart(product: Product) {
    dispatch(add({ ...product, quantity: 1 }));
    toast({
      title: product.title,
      description: "Adicionado ao carrinho!",
    });
  }

  return (
    <Card className="max-w-[25rem] h-[30rem]">
      <CardHeader className="flex flex-col gap-4">
        <Rating rating={Math.round(product.rating)} productId={product.id} />

        <img
          src={product.image}
          alt={product.title}
          className="object-contain w-40 h-40 m-auto"
        />
      </CardHeader>

      <CardContent>
        <CardTitle className="text-card-foreground">{product.title}</CardTitle>
        <CardDescription className="mt-3 font-medium text-card-foreground">
          R$ {product.price.toFixed(2)}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <CardDescription className="text-card-foreground">
          {product.description.slice(0, 100)}...
        </CardDescription>

        <Button onClick={() => addToCart(product)}>Comprar</Button>
      </CardFooter>
    </Card>
  );
}
