import { useState } from 'react';
import scss from './filter.module.scss';
import PropTypes from 'prop-types';// PropTypes 是一個檢查 React 元件 props 類型的工具，可以幫助確保傳入的 props 符合預期。

function Filter({ categories, onChange, multiple = false }) {// Filter 函數是這個元件的定義，接收 categories 和 onChange 這兩個 props，根據 multiple 決定狀態類型
    const [selectedCategories, setSelectedCategories] = useState(multiple ? [] : '');// useState 用來創建 selectedCategory 狀態變量和 setSelectedCategory 更新函數。初始值設為空字串 ''，表示沒有選擇任何類別。

    const handleChange = (e) => {
        const newValue = e.target.value;

        if (multiple) {
            // 複選模式
            setSelectedCategories((prev) => {
                const newSelection = prev.includes(newValue)
                    ? prev.filter((category) => category !== newValue)
                    : [...prev, newValue];

                if (onChange) {
                    onChange(newSelection);
                }

                return newSelection;
            });
        } else {
            // 單選模式
            setSelectedCategories(newValue);
            if (onChange) {
                onChange(newValue);
            }
        }
    };

    return (
        <div className={scss.radioWrapper}>
            {categories.map((category, i) => (
                <label
                    key={i}
                    className={`${scss.customRadio} ${
                        (multiple ? selectedCategories.includes(category) : category === selectedCategories) 
                        ? scss.selected 
                        : ''}`}// 處理被選中的btn加上樣式
                >
                    <input
                        type={multiple ? "checkbox" : "radio"}
                        value={category}
                        checked={multiple
                            ? selectedCategories.includes(category)
                            : category === selectedCategories}// 根據 selectedCategory 是否匹配來決定按鈕是否選中。
                        onChange={handleChange}
                        className={scss.hiddenRadio}// 應用隱藏的樣式，以隱藏標準的單選按鈕樣式。
                    />
                    <span className={scss.radioIndicator}></span>
                    {category}
                </label>
            ))}
        </div>
    );
}
Filter.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,// PropTypes.arrayOf 是一個 PropTypes 的驗證器，用來驗證數組的每個元素是否符合指定的類型。
    // PropTypes.string 指定了數組中的每個元素必須是字符串類型。這意味著 categories 應該是一個由字符串組成的數組。
    // isRequired 是一個鏈式方法，用來指示該 prop 是必須的。這意味著在使用 Filter 元件時，categories 屬性是必須提供的。如果未提供這個屬性，React 會在開發模式下發出警告。
    onChange: PropTypes.func,// PropTypes.func 確保 onChange 必須是函數類型（如果提供的話），但不要求必需提供。
    multiple: PropTypes.bool
};

export default Filter
