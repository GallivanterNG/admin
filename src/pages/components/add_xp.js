import React from "react";
import { DatePicker, Input } from "antd";

export const AddXP = ({
  title,
  setTitle,
  price,
  setPrice,
  description,
  setDescription,
  setDate,
  isAdditionValid,
  handleAddXp,
  setImage,
  loading,
  resetFormVariables
}) => {
  return (
    <div className="mx-auto">
      <div className="mt-4">
        <div className="mb-1">
          <label className="text-gray-500">Experience Image</label>
        </div>
        <Input
          type="file"
          name="image"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        ></Input>
      </div>

      <div className="mt-4">
        <div className="mb-1">
          <label className="text-gray-500"> Title </label>
        </div>
        <Input
          className="w-full h-[48px] hover:border-green-500 active:border-green-600"
          placeholder="Please enter Experience Name"
          value={title}
          required={true}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <div className="mb-1">
          <label className="text-gray-500"> Description </label>
        </div>
        <Input
          className="w-full h-[48px] hover:border-green-500 active:border-green-600"
          placeholder="Please enter Description"
          value={description}
          required={true}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <div className="mb-1">
          <label className="text-gray-500"> Price </label>
        </div>
        <Input
          className="w-full h-[48px] hover:border-green-500 active:border-green-600"
          placeholder="Please enter price"
          value={price}
          required={true}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      

      <div className="mt-4">
        <div className="mb-1">
          <label className="text-gray-500"> Experience Date</label>
        </div>
        <DatePicker
          className="w-full h-[48px]"
          onChange={(date, dateString) => setDate(dateString)}
        />
      </div>

      <div
        className={`${
          isAdditionValid
            ? "bg-green-700 hover:bg-[#0f5c2e] text-white"
            : "bg-gray-200 text-gray-500"
        } text-[16px] w-full mt-8 text-center cursor-pointer capitalize  px-8 py-4 rounded-md w-fit`}
        onClick={isAdditionValid ? handleAddXp : undefined}
      >
        {" "}
        {loading ? "Adding Experience..." : "Add Experience"}
      </div>
    </div>
  );
};
