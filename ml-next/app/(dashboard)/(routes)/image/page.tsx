"use client";

import { useState } from "react";

import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { graphTypes, formSchema } from "./constants";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "react-hot-toast";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      graphTypes: "1",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages("");

      const response = await axios.post("/api/image", values);

      setImages(response.data.image_url);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 402) {
        // proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }

      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="ML Generation"
        description="ML Generation"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm 
              grid 
              grid-cols-12 
              gap-2"
            >
              <FormField
                control={form.control}
                name="graphTypes"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {graphTypes.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}

          {images.length === 0 && !isLoading && (
            <Empty label="No images genrated." />
          )}
          {images && (
            <div className="flex justify-center">
              <Card className="rounded-lg ">
                <div className="">
                  <Image
                    src={images}
                    width={800}
                    height={800}
                    alt="Generated image"
                  />
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
