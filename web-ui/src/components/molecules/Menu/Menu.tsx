import { Box, Chip, makeStyles } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import clsx from 'clsx';
import { FC, useState } from 'react';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import { EMenuItem, IMenuProps } from './menu.types';

const Menu: FC<IMenuProps> = () => {
  const [activeItem, setActiveItem] = useState<EMenuItem>(EMenuItem.HOME);

  const classes = useStyles();

  const handleItemSelect = (menuItem: EMenuItem) => {
    setActiveItem(menuItem);
  };

  const featuredTags: string[] = ['Go', 'Polygon', 'Distributed Systems'];

  const [activeTags, setActiveTags] = useState<{
    tags: string[];
  }>({
    tags: []
  });

  const isActiveTag = (tag: string) => {
    for (let i = 0; i < activeTags.tags.length; i++) {
      if (tag === activeTags.tags[i]) {
        return true;
      }
    }

    return false;
  };

  const toggleTag = (tag: string) => {
    let tags = activeTags.tags;

    if (isActiveTag(tag)) {
      // Remove it from the active set
      const index = tags.indexOf(tag);
      if (index > -1) {
        tags.splice(index, 1);
      }
    } else {
      tags.push(tag);
    }

    setActiveTags({
      tags: tags
    });
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box mb={2}>
        <SectionTitle title={'Menu'} />
      </Box>
      <Box mb={1}>
        <MenuButton
          text={'Home'}
          startIcon={<HomeRoundedIcon />}
          isActive={activeItem === EMenuItem.HOME}
          onClick={() => {
            handleItemSelect(EMenuItem.HOME);
          }}
        />
      </Box>

      <MenuButton
        text={'Tags'}
        startIcon={<LocalOfferRoundedIcon />}
        isActive={activeItem === EMenuItem.TAGS}
        onClick={() => {
          handleItemSelect(EMenuItem.TAGS);
        }}
      />

      <Box my={4}>
        <Box mb={2}>
          <SectionTitle title={'Featured Tags'} />
        </Box>
        <Box
          display={'flex'}
          width={'160px'}
          flexWrap={'wrap'}
          marginRight={'-5px'}
          marginTop={'-10px'}
        >
          {featuredTags.map((featuredTag, index) => {
            return (
              <Chip
                key={`chip-tag-${index}`}
                label={featuredTag}
                variant={'outlined'}
                className={clsx(classes.chip, {
                  [classes.chipActive]: isActiveTag(featuredTag)
                })}
                onClick={() => {
                  toggleTag(featuredTag);
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    chip: {
      marginRight: '5px',
      marginTop: '10px'
    },
    chipActive: {
      border: `1px solid ${theme.palette.custom.trapesysGreen}`
    }
  };
});

export default Menu;
