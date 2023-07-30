import { memo } from 'react';
import useGetChannel from '@/shared/context/channel/hooks/useGetChannel';
import CategoryHeader from '@/component/category/CategoryHeader';
import Detail from '@/component/category/Detail';
import { selectedCategoryIdAtom } from '@/shared/context/category/state';
import { useRecoilValue } from 'recoil';

const Category = () => {
  const { data, status } = useGetChannel({ selectType: 'MANAGE' });

  if (status !== 'success') return null;
  return (
    <>
      <CategoryHeader categories={data!.data} />
      <Detail />
    </>
  );
};

export default memo(Category);
