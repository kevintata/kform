import styled from "styled-components";

export const AddedOption = styled.div<{ isSortable?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #000;
  /* TODO -> create theme and update these color references */

  gap: 10px;
  font-weight: bold;
  overflow-wrap: anywhere;
  width: fit-content;

  :hover {
    cursor: ${({ isSortable }) => (isSortable ? "pointer" : "default")};
  }

  :active {
    cursor: ${({ isSortable }) => (isSortable ? "grab" : "default")};
  }
`;

export const RemoveOptionButtonIcon = styled.button`
  background-color: transparent;
  padding: 0;

  svg {
    margin: 0;
  }

  :hover:enabled {
    background-color: transparent;
    opacity: 0.7;
  }

  :active {
    background-color: transparent;
    opacity: 0.5;
  }

  :disabled {
    cursor: not-allowed;

    opacity: 0.5;
  }
`;
