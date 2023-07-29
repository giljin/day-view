import { memo } from 'react';
import styled, { css } from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { fadeIn, fadeOut } from '@/shared/styles/keyframes';
import { useAnimationHandler, useModal, useOuterClick } from '@/shared/hooks';
import { colorEntries } from '@/shared/util/colorInfo';
import { Icon } from '@/shared/component/Atom';
import { createPortal } from 'react-dom';
import { COLOR_BOX_HEIGHT } from '@/shared/constant/calendar';

interface Props {
  isOpen: boolean;
  x: number;
  y: number;
  channelId: number;
  name: string;
  closeColorBoard({ id }: { id: number }): void;
}

const ColorBoard = ({ closeColorBoard, x, y, channelId, name }: Props) => {
  const { isShow, handleIsShow, handleOnAnimationEnd } =
    useAnimationHandler(closeColorBoard);

  const { openModal } = useModal();

  const ref = useOuterClick<HTMLDivElement>({
    callback: handleIsShow,
  });
  return createPortal(
    <Box
      ref={ref}
      isShow={isShow}
      x={x}
      y={y}
      onAnimationEnd={handleOnAnimationEnd}
    >
      <ConfigButton
        onClick={() => {
          handleIsShow();
          openModal('ManageChannel', { channelId: channelId, name: name });
        }}
      >
        <Icon type="sm_config" />
        <span>관리</span>
      </ConfigButton>
      <ConfigButton
        onClick={() => {
          handleIsShow();
          openModal('ManageChannel', { channelId: channelId, name: name });
        }}
      >
        <Icon type="sm_user" />
        <span>관리</span>
      </ConfigButton>
      <ColorWrap>
        {colorEntries.map(([key, value]) => (
          <ColorCircle key={key} rgb={value} />
        ))}
      </ColorWrap>
    </Box>,
    document.getElementById('box')!
  );
};

export default memo(ColorBoard);

const Box = styled.div<{ isShow: boolean; x: number; y: number }>`
  position: absolute;
  height: ${COLOR_BOX_HEIGHT}px;
  overflow: hidden;

  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  z-index: 55555;
  width: 140px;

  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 11px;
  background-color: #fff;

  ${({ isShow }) =>
    isShow
      ? css`
          animation: ${fadeIn} 0.15s ease-in-out 0s forwards;
        `
      : css`
          animation: ${fadeOut} 0.15s ease-in-out 0s forwards;
        `}
`;

const ConfigButton = styled.button`
  width: 100%;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  padding: 5px;
  display: flex;
  align-items: center;
  background-color: ${getStyledThemProperty('colors', 'White')}};

  > span {
    margin-left: ${pixelToRemUnit(7)};
    ${getStyledThemProperty('fonts', 'caption3')};
  }
`;

const ColorWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  padding: 10px;
  gap: 12px;
`;

const ColorCircle = styled.span<{ rgb: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ rgb }) => rgb};

  :hover {
    transform: scale(1.1);
  }
`;
