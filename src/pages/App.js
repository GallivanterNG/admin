import { Input } from "antd";
import { useAuth } from "../auth/auth_contaxt";
import { useState } from "react";
import { handleCreateXp, useFetchData } from "../config/firebase_config";
import { useNavigate } from "react-router-dom";
import { AddXP } from "./components/add_xp";


const App = () => {
  const { user, userID, signOut } = useAuth()
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const isAdditionValid = true

  const handleAddXp = async () => {
    
    const bookings = []
    const isSuccess = await handleCreateXp(
      userID,
      title,
      price,
      description,
      date,
      bookings,
      image
    )
    if (isSuccess) {
      console.log("Experience Created")
    }
  }
  const userDoc = useFetchData("providers", userID)
  const navigate = useNavigate()


  const handleLogOut = async () => {
    try {
      await signOut()
      navigate('/signin')
    } catch (error) {

    }
  }

  return (
    <div className="h-screen">
      <div className="w-full flex justify-center max-w-[2880px]">
        <div className='flex justify-between  w-1/2 mx-auto]'>
          <div>Admin</div>
          <h2
            onClick={handleLogOut}
            className={`font-medium mr-[16px] md:mr-0 cursor-pointer hover:text-gray-600 flex 
              `}
          >
            SignOut{" "}
          </h2>
          <div>{user.email}</div>
        </div>
      </div>


      <div className="w-full flex justify-center">
        <div className="w-1/2">
          <h3 className="font-medium text-[24px] mt-12">Create an event</h3>
          <AddXP title={title}
            setTitle={setTitle}
            price={price}
            setPrice={setPrice}
            description={description}
            setDescription={setDescription}
            setDate={setDate}
            setImage={setImage}
            isAdditionValid={isAdditionValid}
            handleAddXp={handleAddXp} />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-1/2">
          <h3 className="font-medium text-[24px] mt-12">Your events</h3>

          {userDoc?.listings?.map((provider) => (
            <div key={provider.id}>
              <p>{provider.title}</p>
            </div>
          ))}

        </div>

      </div>
    </div>

  );
}

export default App;
