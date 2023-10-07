import React, { Fragment, useState, useEffect, useContext } from 'react';
import CustomContext from '../../_helper/Customizer';
import { MENUITEMS } from './Menu';
import SidebarIcon from './SidebarIcon';
import SidebarLogo from './SidebarLogo';
import SidebarMenu from './SidebarMenu';

const Sidebar = (props: any) => {
  const customizer: any = useContext(CustomContext);
  const { toggleIcon }: any = useContext(CustomContext);
  const id = window.location.pathname.split('/').pop();
  const defaultLayout = Object.keys(customizer.layout);

  const layout = id ? id : defaultLayout;
  // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState<any>(MENUITEMS);

  const [width, setWidth] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      // if (
      //   customizer.settings.sidebar.type.split(' ').pop() ===
      //   'material-type' ||
      //   customizer.settings.sidebar.type.split(' ').pop() ===
      //   'advance-layout'
      // )
      document.querySelector('.sidebar-main')!.className = 'sidebar-main hovered';
    } else {
      if (document.getElementById('sidebar-main')) document.querySelector('.sidebar-main')!.className = 'sidebar-main';
    }
  };

  useEffect(() => {
    document.querySelector('.left-arrow')!.classList.add('d-none');
    window.addEventListener('resize', handleResize);
    handleResize();
    const currentUrl = window.location.pathname;
    MENUITEMS.map((items) => {
      items.Items.filter((Items: any) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems: any) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems: any) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [layout]);

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  };

  const activeClass = () => {
    // document.querySelector('.sidebar-link').classList.add('active');
    document.querySelector('.bg-overlay1')!.classList.add('active');
  };

  const setNavActive = (item: any) => {
    MENUITEMS.map((menuItems) => {
      menuItems.Items.filter((Items: any) => {
        if (Items !== item) {
          Items.active = false;
          document.querySelector('.bg-overlay1')!.classList.remove('active');
        }
        if (Items.children && Items.children.includes(item)) {
          Items.active = true;
          document.querySelector('.sidebar-links')!.classList.add('active');
        }
        if (Items.children) {
          Items.children.filter((submenuItems: any) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            } else {
              return false;
            }
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const closeOverlay = () => {
    document.querySelector('.bg-overlay1')!.classList.remove('active');
    document.querySelector('.sidebar-links')!.classList.remove('active');
  };

  return (
    <Fragment>
      <div
        className='bg-overlay1'
        onClick={() => {
          closeOverlay();
        }}></div>
      <div className={`sidebar-wrapper ${toggleIcon ? 'close_icon' : ''}`} sidebar-layout='stroke-svg'>
        <SidebarIcon />
        <SidebarLogo />
        {/* sidebartoogle={sidebartoogle} */}
        <SidebarMenu setMainMenu={setMainMenu} props={props} setNavActive={setNavActive} activeClass={activeClass} width={width} sidebartoogle={false} />
      </div>
    </Fragment>
  );
};

export default Sidebar;
