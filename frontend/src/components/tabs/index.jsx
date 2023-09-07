import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurTab} from '../../config/reducer';

const Tab = (props) => {
    const tabName = props.tab.tabName;
    const isOn = props.tab.isOn;
    const tabId = props.tab.id;
    const dispatch = useDispatch();

    const changeTab = () => {
        document.querySelector('.tabList li a.on').classList.remove('on');
        document.querySelector('.tabList li a#' + tabId).classList.add('on');
        dispatch(setCurTab(tabId));
    };

    return (
        <li role='presentation' style={{ minWidth: props.minWidth + 'px' }}>
            <a href='#!'
                role='tab'
                tabIndex="0"
                id={tabId}
                aria-selected={isOn.toString()}
                className={isOn ? 'on' : ''}
                onClick={changeTab}>
                <span>{tabName}</span>
            </a>
        </li>
    );
};

export const TabList = () => {
    const tabList = [
        { tabName: '색상', id: 'color', isOn: true },
        { tabName: '그라데이션', id: 'gradation', isOn: false },
    ];
    const minWidth = Math.floor(window.innerWidth / tabList.length);

    return (
        <div className='tabBox'>
            <ul className='tabList' role='tablist'>
                {tabList && tabList.map(v => {
                    return (
                        <Tab key={v.id} tab={v}/>
                    )
                })}
            </ul>
        </div>
    );
};