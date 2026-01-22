import {
  BookmarkIcon as BookmarkOutline,
  ListBulletIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';

interface ActionBarProps {
  isFavorite: boolean;
  isEditingAlias: boolean;
  alias: string;
  openAliasEditor: () => void;
  closeAliasEditor: () => void;
  saveFavorite: () => void;
  removeFavorite: () => void;
  setAlias: (value: string) => void;
  openModal: () => void;
}

export const ActionBar = ({
  isFavorite,
  isEditingAlias,
  alias,
  openAliasEditor,
  closeAliasEditor,
  saveFavorite,
  removeFavorite,
  setAlias,
  openModal,
}: ActionBarProps) => {
  return (
    <div className='w-full flex justify-between items-start mb-10'>
      <div className='flex items-center gap-2'>
        <Link
          to={ROUTES.favoriteWeathers}
          className='text-3xl drop-shadow-md lg:hidden'
          aria-label='즐겨찾기 목록'
        >
          <ListBulletIcon className='h-8 w-8 text-white' />
        </Link>
        <button
          type='button'
          onClick={isFavorite ? removeFavorite : openAliasEditor}
          className='text-3xl drop-shadow-md'
        >
          {isFavorite ? (
            <BookmarkSolid className='h-8 w-8 text-white' />
          ) : (
            <BookmarkOutline className='h-8 w-8 text-white' />
          )}
        </button>

        {isEditingAlias && (
          <div className='flex bg-white/20 backdrop-blur-md rounded-lg p-1 animate-fadeIn'>
            <input
              type='text'
              value={alias}
              maxLength={6}
              onChange={(e) => setAlias(e.target.value.slice(0, 6))}
              placeholder='별칭 입력'
              className='bg-transparent border-none outline-none px-2 text-sm w-24 placeholder:text-blue-100'
            />
            <button
              type='button'
              onClick={saveFavorite}
              className='px-2 text-sm font-bold'
            >
              저장
            </button>
            <button
              type='button'
              onClick={closeAliasEditor}
              className='px-2 text-sm'
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <button type='button' onClick={openModal}>
        <MagnifyingGlassIcon className='h-9 w-9 text-white' />
      </button>
    </div>
  );
};
