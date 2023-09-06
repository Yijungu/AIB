import { useDispatch } from 'react-redux';

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
            <a href='#'
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