import { Rating } from "@/components/Rating";
import { Review } from "@/components/Review";
import { useGetProductById } from "@/redux/hooks/productsHooks";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { add, changeQuantity, remove } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks/reduxTypedHooks";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/redux/hooks/cartHooks";
import { Plus, Minus, Trash, ArrowUUpLeft } from "@phosphor-icons/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Rate } from "@/components/Rate";
import { useEffect, useState } from "react";
import { reviewProduct } from "@/redux/features/reviewsSlice";
import { useGetReviewsById } from "@/redux/hooks/reviewsHooks";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters.",
    })
    .refine((value) => value.trim() !== "", {
      message: "Name cannot be empty.",
    })
    .refine(
      (value) =>
        /^[a-zA-Záéíóúâêîôûãõ]+[-'s]?[a-zA-Záéíóúâêîôûãõ ]+$/gi.test(value),
      "Name should contain only alphabets"
    ),
  comment: z
    .string()
    .min(20, {
      message: "Comment must be at least 20 characters.",
    })
    .refine(
      (value) => /^[a-zA-Z,.!?0-9]+[-'s]?[a-zA-Z,.!?0-9 ]+$/.test(value),
      "Comment should contain only alphabets, numbers, and punctuation marks."
    ),
  recommend: z.boolean(),
  rating: z.coerce
    .number()
    .int()
    .min(1, {
      message: "Rating must be at least 1.",
    })
    .max(5, {
      message: "Rating must be at most 5.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

export function Product() {
  const [rating, setRating] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const cart = useCart();
  const navigate = useNavigate();
  const reviews = useGetReviewsById({ id: Number(id) });

  const product = useGetProductById({ id: Number(id) });

  const alreadyInCart = cart.find((item) => item.id === product?.id);

  let averageRating: number = 0;

  if (reviews) {
    averageRating =
      reviews?.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
      reviews?.reviews.length;
  }

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  function handleRating(rating: number) {
    setRating(rating);
    form.setValue("rating", rating);
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      comment: "",
      recommend: true,
      rating: rating,
    },
  });

  function onSubmit(values: FormSchema) {
    const review = {
      ...values,
      date: JSON.stringify(new Date()),
    };

    dispatch(reviewProduct({ productId: Number(id), review }));

    form.reset();
    setRating(0);
  }

  function handleRemove(id: number) {
    dispatch(remove(id));
  }

  function handleItemQuantiy({
    action,
    id,
  }: {
    action: "add" | "remove";
    id: number;
  }) {
    dispatch(changeQuantity({ action, id }));
  }

  function addToCart() {
    if (product) {
      dispatch(add({ ...product, quantity: 1 }));
      toast({
        title: product.title,
        description: "Added to cart!",
      });
    }
  }

  return (
    <div className="min-h-screen pb-12 max-w-screen">
      {product ? (
        <div className="pl-4 pr-4 pt-12 pb-12 m-auto flex flex-col items-center gap-20 max-w-[1440px] justify-center">
          <Button
            onClick={() => navigate("/store")}
            className="self-start"
            aria-label="Go back to previous page"
          >
            <ArrowUUpLeft size={32} />
          </Button>
          <div className="flex flex-col items-center justify-center gap-8 max-w-[50rem]">
            <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
              <img
                src={product?.image}
                alt={product?.description}
                className="object-contain size-3/5  max-h-[calc(100lvh-350px)]"
              />

              <div className="flex flex-col gap-4">
                <Rating rating={averageRating} />
                <h1 className="text-2xl font-bold">{product?.title}</h1>
                <p className="text-lg font-bold text-green-700">
                  {formatPrice(product.price)}
                </p>

                {alreadyInCart ? (
                  <div className="flex items-center justify-start gap-2">
                    <Button
                      className="px-2 py-2 text-xs"
                      onClick={() =>
                        handleItemQuantiy({ action: "remove", id: product?.id })
                      }
                    >
                      <Minus size={"1rem"} weight="bold" />
                    </Button>

                    <span className="px-3 py-1 text-lg font-bold border-2 rounded-lg border-primary">
                      {alreadyInCart.quantity}
                    </span>

                    <Button
                      className="px-2 py-2 text-xs"
                      onClick={() =>
                        handleItemQuantiy({ action: "add", id: product.id })
                      }
                    >
                      <Plus size={"1rem"} weight="bold" />
                    </Button>

                    <Button
                      className="px-2 py-2 ml-auto text-xs bg-red-900 hover:bg-red-800"
                      onClick={() => handleRemove(product.id)}
                    >
                      <Trash size={"1rem"} weight="bold" />
                    </Button>
                  </div>
                ) : (
                  <Button onClick={addToCart}>Add to cart</Button>
                )}
              </div>
            </div>
            <p>
              <strong>Description: </strong>
              {product?.description}.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="self-center text-xl font-bold uppercase">
              Customer Reviews
            </h2>

            <div className="flex flex-wrap gap-x-16 gap-y-8">
              {reviews ? (
                reviews.reviews.map((review) => (
                  <Review key={review.date} review={review} />
                ))
              ) : (
                <p>This product doesn't have reviews</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 max-w-[50rem] w-full">
            <h2 className="text-xl font-bold uppercase">Make your review</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recommend"
                  render={({ field }) => (
                    <FormItem
                      className={`flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md ${
                        field.value === true ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      <FormControl>
                        <Checkbox
                          aria-labelledby="recommend-label"
                          id="recommend"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="recommend" id="recommend-label">
                          I recommend this product!
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="rating"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <Rate handleRating={handleRating} rating={rating} />
                      <FormControl className="hidden">
                        <Input
                          placeholder="Your rating"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="comment"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your comment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-2"
                  disabled={form.formState.isSubmitting}
                >
                  Submit
                </Button>
              </form>
              {form.formState.isSubmitted && (
                <p className="text-green-700">Review submitted successfully!</p>
              )}
            </Form>
          </div>
        </div>
      ) : (
        <div className="pl-4 pr-4 pt-12 pb-12 m-auto flex flex-col items-center gap-20 max-w-[1440px] justify-center">
          <Button
            onClick={() => navigate(-1)}
            className="self-start"
            aria-label="Go back to previous page"
          >
            <ArrowUUpLeft size={32} />
          </Button>
          <div className="flex flex-col items-center justify-center gap-8 max-w-[50rem]">
            <Skeleton className="max-w-[50rem] w-[80vw] h-[calc(100lvh-350px)]" />
            <Skeleton className="max-w-[50rem] w-[80vw] h-[100px]" />
          </div>
        </div>
      )}
    </div>
  );
}
