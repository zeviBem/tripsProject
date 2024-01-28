interface SelectProps {
    category: string
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Select = (props: SelectProps) => {
    return (
        <div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select an option
        </label>
        <select
          id="categories"
          name="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={props.category}
          onChange={props.handleInputChange}
          required
        >
          <option value="" disabled selected>
            Choose a category
          </option>
          <option value="natureTrips">NatureTrips</option>
          <option value="picnic">Picnic</option>
          <option value="attractions">Attractions</option>
          <option value="parks">Parks</option>
        </select>
      </div>
    )
}

export default Select