import './index.css'

const TagItem = props => {
  const {tagDetails, changeTag, isActive} = props
  const {optionId, displayText} = tagDetails

  const activeTagClass = isActive ? 'active-tag' : ''

  const onClickTag = () => {
    changeTag(optionId)
  }

  return (
    <li className="list-item">
      <button
        type="button"
        className={`tag-button ${activeTagClass}`}
        onClick={onClickTag}
      >
        {displayText}
      </button>
    </li>
  )
}
export default TagItem
