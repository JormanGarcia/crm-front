import React, { useRef, useState } from "react";
import { BiCloudUpload, BiUpload, BiX } from "react-icons/bi";
import { styled } from "stitches.config";
import { useFileUpload } from "utils/hooks/use-file-upload-hook";

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
  display: "flex",
  gap: 16,
});

const ImagePreview = styled("img", {
  width: 70,
  height: 60,
  objectFit: "cover",
  borderRadius: 4,
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

const FileUpload = () => {
  const [value, setValue] = useState<any[]>([]);
  const drop = useRef<HTMLLabelElement>(null);

  const deleteImage = (name: string) => {
    setValue(value.filter((item) => item.name !== name));
  };

  const addFile = (files: FileList) => {
    setValue([...value, ...files]);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFile(e.target.files);
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
          <ImagePreviewContainer key={Math.random()}>
            <ImagePreview src={URL.createObjectURL(item)} />
            <CloseIconContainer onClick={() => deleteImage(item.name)}>
              <CloseIcon />
            </CloseIconContainer>
          </ImagePreviewContainer>
        ))}
      </ImagePreviewStack>
    </FileUploadContainer>
  );
};

export default FileUpload;
