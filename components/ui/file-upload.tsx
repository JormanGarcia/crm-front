import { Attachment } from "graphql/genenerated";
import React, { useRef, useState } from "react";
import { BiCloudUpload, BiUpload, BiX } from "react-icons/bi";
import { styled } from "stitches.config";
import { ENV_VARIABLES } from "utils/config";
import { useFileUpload } from "utils/hooks/use-file-upload-hook";
import LoadingSpinner from "./loading-spinner";

const InputFileLabel = styled("label", {
  "& > input": {
    display: "none",
  },

  border: "1px dashed $gray400",
  padding: "40px 20px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: 4,
  gap: 16,
});

const ImagePreviewStack = styled("div", {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(7, 1fr)",
});

const ImagePreview = styled("img", {
  width: "100%",
  height: 60,
  objectFit: "cover",
  borderRadius: 4,
});

const ImageLoading = styled("div", {
  width: "100%",
  height: 60,
  objectFit: "cover",
  borderRadius: 4,
  background: "$gray200",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  [`& ${LoadingSpinner}`]: {
    width: 30,
    height: 30,
    borderWidth: 5,
  },
});

const FileUploadContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

const ImagePreviewContainer = styled("div", {
  position: "relative",
});

const CloseIconContainer = styled("button", {
  display: "flex",
  background: "$red500",
  top: -5,
  right: -10,
  position: "absolute",
  border: "none",
  borderRadius: "100%",
  padding: 3,
});

const CloseIcon = styled(BiX, {
  color: "white",
  fontSize: 16,
});

const UploadIcon = styled(BiCloudUpload, {
  fontSize: 72,
  color: "$gray400",
});

const LabelText = styled("span", {
  color: "$gray400",
  maxWidth: 260,

  "& > b": {
    color: "$main500",
    fontWeight: "500",
  },
});

interface Props {
  value: Attachment[];
  setValue: (x: Attachment[] | ((y: Attachment[]) => void)) => void;
}

const FileUpload = ({ setValue, value }: Props) => {
  const drop = useRef<HTMLLabelElement>(null);

  const [loading, setLoading] = useState(false);

  async function uploadImages(files: FileList): Promise<Attachment[]> {
    const data = new FormData();

    data.append(`files`, files[0]);

    setLoading(true);

    const response = await fetch(ENV_VARIABLES.BACKEND_REST + "upload", {
      body: data,
      headers: {
        Accept: "application/json",
      },
      method: "POST",
    });

    const responseJson = await response.json();

    setLoading(false);

    return responseJson;
  }

  const deleteImage = (id: string) => {
    setValue(value.filter((item) => item.id !== id));
  };

  const addFile = async (files: FileList) => {
    const response = await uploadImages(files);
    console.log("value", value);
    console.log("response", response);
    setValue((value) => [...value, ...response]);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 1) {
        addFile(e.target.files);
      } else {
        addFile(e.target.files);
      }
    }
  };

  const [isOver] = useFileUpload(drop, addFile);

  return (
    <FileUploadContainer>
      <InputFileLabel ref={drop}>
        <UploadIcon />
        {!isOver && (
          <LabelText>
            <b>Upload an image</b> or drag and drop PNG, JPG
          </LabelText>
        )}

        {isOver && (
          <LabelText>
            <b>Drop the image</b>
          </LabelText>
        )}

        <input type={"file"} onChange={onChangeInput} />
      </InputFileLabel>
      <ImagePreviewStack>
        {value.map((item) => (
          <ImagePreviewContainer>
            <ImagePreview src={item.thumbnail} />
            <CloseIconContainer
              onClick={() => deleteImage(item.id)}
              type="button"
            >
              <CloseIcon />
            </CloseIconContainer>
          </ImagePreviewContainer>
        ))}
        {loading && (
          <ImageLoading>
            <LoadingSpinner />
          </ImageLoading>
        )}
      </ImagePreviewStack>
    </FileUploadContainer>
  );
};

export default FileUpload;
