export const handleChangeDisplayStyles = (classNames, displayStyle) =>
    (document.querySelector(`.${classNames}`).style.display = displayStyle);
