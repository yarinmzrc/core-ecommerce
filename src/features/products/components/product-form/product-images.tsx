import { Image } from "@/components/image"
import { Button } from "@/components/ui/button/button"
import { FormError } from "@/components/ui/form/form-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ImageDTO } from "../../dtos"

type ProductImagesProps = {
  existingImages: ImageDTO[]
  onRemoveExisting: (publicId: string) => void
  newImageInputs: number[]
  onAddNew: () => void
  onRemoveNew: (id: number) => void
  error?: string
}

export function ProductImages({
  existingImages,
  onRemoveExisting,
  newImageInputs,
  onAddNew,
  onRemoveNew,
  error,
}: ProductImagesProps) {
  return (
    <div className="space-y-2">
      <Label>Images</Label>
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {existingImages.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image.url}
                alt={`Produce Image ${index + 1}`}
                width={100}
                height={100}
                className="h-32 w-full rounded-md object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 size-6 p-0"
                onClick={() => onRemoveExisting(image.publicId)}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {newImageInputs.map((id) => (
          <div key={id} className="flex items-center gap-2">
            <Input type="file" name="images" />
            <Button
              type="button"
              variant="destructive"
              onClick={() => onRemoveNew(id)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={onAddNew}>
          Add Image
        </Button>

        {error && <FormError error={error} />}
      </div>
    </div>
  )
}
