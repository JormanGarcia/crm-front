import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import IconButton from "./icon-button";
import { BiDotsHorizontalRounded, BiPencil, BiTrash } from "react-icons/bi";
import { styled } from "stitches.config";
import { useRouter } from "next/router";

const DropdownContent = styled(DropdownMenu.Content, {
  background: "white",
  border: "1px solid $gray200",
  borderRadius: 4,
  boxShadow: "0px 5px 10px rgba(0,0,0,0.05)",
});

const DropdownItem = styled(DropdownMenu.Item, {
  padding: "12px 16px",
  cursor: "default",
  "&:hover": {
    background: "$gray200",
    color: "$text500",
    outline: "none",
  },
  color: "$text400",
  display: "flex",
  alignItems: "center",
  gap: 12,

  "& span": {
    fontSize: "$sm",
  },

  "& svg": {
    fontSize: 18,
  },
});

interface Props {
  editUrl?: string;
  onDelete: () => void;
}

export const ActionsMenu = (props: Props) => {
  const { editUrl, onDelete } = props;
  const router = useRouter();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton css={{ marginLeft: "auto" }}>
          <BiDotsHorizontalRounded />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownContent sideOffset={10} align="start">
        {editUrl && (
          <DropdownItem onClick={() => router.push(editUrl)}>
            <BiPencil />
            <span>Editar</span>
          </DropdownItem>
        )}
        <DropdownItem onClick={onDelete}>
          <BiTrash />
          <span>Borrar</span>
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu.Root>
  );
};
