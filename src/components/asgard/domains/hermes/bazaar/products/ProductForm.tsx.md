// src/components/commerce/ProductForm.tsx
// Product Form - Create and edit products
// INTEGRATES: useAuth, useCreateProducts, ProductsInsertSchema

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Base UI Components
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Slider } from "@/components/ui/Slider";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";

// Generated Types & Validators
import { ProductsInsertSchema, type ProductsInsertInput } from "@/lib/validators/generated/plutus-economics/products";
import { PRODUCT_TYPE } from "@/lib/constants/generated/plutus-economics/product_type";
import { OWNER_TYPE } from "@/lib/constants/generated/plutus-economics/owner_type";

// Generated Hooks
import { useCreateProducts, useUpdateProducts } from "@/hooks/generated/plutus-economics/products";

// Auth Hook
import { useAuth } from "@/hooks/useAuth";

// Shared Utils
import { required, minLength, maxLength, pattern, composeValidators } from "@/utils/components/ui/unified_form";

export interface ProductFormProps {
  /** Product ID for edit mode */
  productId?: string;
  /** Initial data for edit mode */
  initialData?: ProductsInsertInput;
  /** Callback on success */
  onSuccess?: (product: any) => void;
  /** Callback on cancel */
  onCancel?: () => void;
  /** Additional className */
  className?: string;
}

// Product type options for select dropdown
const PRODUCT_TYPE_OPTIONS = Object.entries(PRODUCT_TYPE).map(([key, value]) => ({
  value,
  label: key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
}));

export function ProductForm({
  productId,
  initialData,
  onSuccess,
  onCancel,
  className,
}: ProductFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { create, loading: isCreating } = useCreateProducts();
  const { update, loading: isUpdating } = useUpdateProducts();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const isEditMode = !!productId;
  const isLoading = isCreating || isUpdating || isSubmitting;

  // Initialize form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<ProductsInsertInput>({
    resolver: zodResolver(ProductsInsertSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      description: "",
      product_type: "digital_download",
      owner_type: "creator",
      is_published: false,
      is_recurring: false,
      active: true,
      price_community: 0,
      price_ally: 25,
      price_corporate: 100,
      residual_pool_percent: 30,
      sanctuary_infrastructure_percent: 10,
      category: [],
      tags: [],
      media_urls: [],
    },
  });

  // Watch values for conditional UI
  const watchProductType = watch("product_type");
  const watchIsRecurring = watch("is_recurring");
  const watchResidualPercent = watch("residual_pool_percent") || 30;

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // Auto-generate slug when title changes (only for new products)
  useEffect(() => {
    if (!isEditMode && !initialData?.slug) {
      const title = watch("title");
      if (title) {
        setValue("slug", generateSlug(title));
      }
    }
  }, [watch("title"), isEditMode, initialData, setValue]);

  // Handle form submission
// Replace the onSubmit function with this corrected version

  const onSubmit = async (data: ProductsInsertInput) => {
    if (!user) {
        setSubmitError("You must be logged in to create a product");
        return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
        // Ensure owner_type is exactly the literal value
        const submissionData = {
        ...data,
        creator_id: user.id,
        owner_type: "creator" as const,  // ← FIX: Use const assertion
        };

        let result;
        if (isEditMode && productId) {
        result = await update(productId, submissionData);
        } else {
        result = await create(submissionData);
        }

        if (result.error) {
        throw new Error(result.error);
        }

        onSuccess?.(result.data);
        
        if (!isEditMode) {
        setTimeout(() => {
            router.push(`/bazaar/creations/${result.data.id}`);
        }, 1500);
        }
    } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
        setIsSubmitting(false);
    }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-8", className)}>
      {/* Error Message */}
      {submitError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{submitError}</p>
        </div>
      )}

      {/* ===================================================== */}
      {/* BASIC INFORMATION SECTION */}
      {/* ===================================================== */}
      <Card variant="default" size="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-star-dust mb-1">Basic Information</h3>
          <p className="text-sm text-star-dust/40">Tell the world about your creation</p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" variant="required">
            Product Title
          </Label>
          <Input
            id="title"
            placeholder="e.g., The Quantum Weaver's Guide"
            variant={errors.title ? "error" : "default"}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-400">{errors.title.message}</p>
          )}
          <p className="text-xs text-star-dust/40">
            A clear, descriptive title helps people discover your work
          </p>
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug" variant="required">
            URL Slug
          </Label>
          <Input
            id="slug"
            placeholder="e.g., quantum-weaver-guide"
            variant={errors.slug ? "error" : "default"}
            {...register("slug")}
          />
          {errors.slug && (
            <p className="text-sm text-red-400">{errors.slug.message}</p>
          )}
          <p className="text-xs text-star-dust/40">
            Used in the product URL. Use lowercase letters, numbers, and hyphens.
          </p>
        </div>

        {/* Product Type */}
        <div className="space-y-2">
          <Label htmlFor="product_type" variant="required">
            Product Type
          </Label>
          <Select
            id="product_type"
            variant={errors.product_type ? "error" : "default"}
            {...register("product_type")}
          >
            {PRODUCT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.product_type && (
            <p className="text-sm text-red-400">{errors.product_type.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Tell people about your product. What makes it special? What problem does it solve?"
            rows={5}
            variant={errors.description ? "error" : "default"}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-400">{errors.description.message}</p>
          )}
          <p className="text-xs text-star-dust/40">
            Markdown supported. You can use **bold**, *italic*, and [links]().
          </p>
        </div>
      </Card>

      {/* ===================================================== */}
      {/* PRICING SECTION */}
      {/* ===================================================== */}
      <Card variant="default" size="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-star-dust mb-1">Pricing</h3>
          <p className="text-sm text-star-dust/40">Set your tiered pricing structure</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Community Tier */}
          <div className="space-y-2">
            <Label htmlFor="price_community">
              Community Tier <span className="text-xs text-cyan-400">(ND)</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40">$</span>
              <Input
                id="price_community"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="pl-7"
                variant={errors.price_community ? "error" : "default"}
                {...register("price_community", { valueAsNumber: true })}
              />
            </div>
            {errors.price_community && (
              <p className="text-sm text-red-400">{errors.price_community.message}</p>
            )}
            <p className="text-xs text-star-dust/40">
              For neurodivergent community members (can be $0)
            </p>
          </div>

          {/* Ally Tier */}
          <div className="space-y-2">
            <Label htmlFor="price_ally" variant="required">
              Ally Tier
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40">$</span>
              <Input
                id="price_ally"
                type="number"
                step="0.01"
                min="0"
                placeholder="25.00"
                className="pl-7"
                variant={errors.price_ally ? "error" : "default"}
                {...register("price_ally", { valueAsNumber: true })}
              />
            </div>
            {errors.price_ally && (
              <p className="text-sm text-red-400">{errors.price_ally.message}</p>
            )}
            <p className="text-xs text-star-dust/40">Standard price for supporters</p>
          </div>

          {/* Corporate Tier */}
          <div className="space-y-2">
            <Label htmlFor="price_corporate">Corporate Tier</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40">$</span>
              <Input
                id="price_corporate"
                type="number"
                step="0.01"
                min="0"
                placeholder="100.00"
                className="pl-7"
                variant={errors.price_corporate ? "error" : "default"}
                {...register("price_corporate", { valueAsNumber: true })}
              />
            </div>
            {errors.price_corporate && (
              <p className="text-sm text-red-400">{errors.price_corporate.message}</p>
            )}
            <p className="text-xs text-star-dust/40">For organizations and businesses (optional)</p>
          </div>
        </div>
      </Card>

      {/* ===================================================== */}
      {/* RESIDUAL SETTINGS SECTION */}
      {/* ===================================================== */}
      <Card variant="default" size="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-star-dust mb-1">Residual Sharing</h3>
          <p className="text-sm text-star-dust/40">Share earnings with contributors</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="residual_pool_percent">Residual Pool Percentage</Label>
              <span className="text-sm text-cyan-400">{watchResidualPercent}%</span>
            </div>
            <Slider
              value={[watchResidualPercent]}
              onValueChange={(val) => {
                // Handle both single number and array
                const newValue = Array.isArray(val) ? val[0] : val;
                setValue("residual_pool_percent", newValue);
              }}
              min={0}
              max={50}
              step={5}
              variant="quantum"
            />
            <p className="text-xs text-star-dust/40">
              This percentage of your earnings will be shared with contributors
            </p>
          </div>

          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-purple-400 text-sm">
              {watchResidualPercent}% of your earnings will go to a pool shared with contributors
            </p>
            <p className="text-star-dust/40 text-xs mt-1">
              You can add contributors after creating the product
            </p>
          </div>
        </div>
      </Card>

      {/* ===================================================== */}
      {/* PUBLISHING SECTION */}
      {/* ===================================================== */}
      <Card variant="default" size="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-star-dust mb-1">Publishing</h3>
          <p className="text-sm text-star-dust/40">Control your product's visibility</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="is_published">Publish immediately</Label>
              <p className="text-xs text-star-dust/40">If unchecked, product will be saved as a draft</p>
            </div>
            <Switch
              id="is_published"
              checked={watch("is_published") ?? false}
              onCheckedChange={(checked) => setValue("is_published", checked)}
              variant="quantum"
            />
          </div>

          {watchProductType === "digital_subscription" && (
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="is_recurring">Recurring billing</Label>
                <p className="text-xs text-star-dust/40">Charge customers on a recurring basis</p>
              </div>
              <Switch
                id="is_recurring"
                checked={watch("is_recurring") ?? false}
                onCheckedChange={(checked) => setValue("is_recurring", checked)}
                variant="quantum"
              />
            </div>
          )}
        </div>
      </Card>

      {/* ===================================================== */}
      {/* FORM ACTIONS */}
      {/* ===================================================== */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading || (!isEditMode && !isValid)}
          className="flex-1"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{isEditMode ? "Saving..." : "Creating..."}</span>
            </div>
          ) : (
            <span>{isEditMode ? "Save Changes" : "Create Product"}</span>
          )}
        </Button>

        {onCancel && (
          <Button type="button" variant="outline" size="lg" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>

      {/* Success indicator for new products */}
      {!isEditMode && !isSubmitting && !submitError && (
        <p className="text-center text-sm text-green-400">
          Product created successfully! Redirecting...
        </p>
      )}
    </form>
  );
}