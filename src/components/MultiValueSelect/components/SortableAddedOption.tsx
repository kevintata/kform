import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import * as S from "./styles";
type SortableAddedOptionProps = {
  value: string;
  id: string;
  index: number;
  handleRemoveValue: (index: number) => void;
  isSortable?: boolean;
  isDisabled?: boolean;
};

export const SortableAddedOption: React.FC<SortableAddedOptionProps> = ({
  value,
  id,
  index,
  handleRemoveValue,
  isSortable,
  isDisabled,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    index: sortableIndex,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      {isSortable && (
        <S.AddedOption
          isSortable
          style={{
            ...style,
            padding: 0,
            gap: 0,
          }}
        >
          <div
            style={{ height: "100%", width: "100%", padding: "12px" }}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
          >
            {`${sortableIndex + 1} - ${value}`}
          </div>
          <S.RemoveOptionButtonIcon
            style={{
              padding: "0 12px 0 0",
            }}
            type="button"
            onClick={() => handleRemoveValue(index)}
            disabled={isDisabled}
            aria-label={`Remove ${value}`}
          >
            x{/* TODO Add delete icon */}
          </S.RemoveOptionButtonIcon>
        </S.AddedOption>
      )}
      {!isSortable && (
        <S.AddedOption>
          <div>{`${index + 1} - ${value}`}</div>
          <S.RemoveOptionButtonIcon
            type="button"
            onClick={() => handleRemoveValue(index)}
            disabled={isDisabled}
            aria-label={`Remove ${value}`}
          >
            x{/* TODO Add delete icon */}
          </S.RemoveOptionButtonIcon>
        </S.AddedOption>
      )}
    </>
  );
};
