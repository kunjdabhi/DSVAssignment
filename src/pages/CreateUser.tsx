import { useState, type ChangeEvent } from "react"
import { UserForm } from "../components/UserForm"
import type { User } from "../types/user.type"
import { userService } from "../services/users.service"

export const CreateUser = () => {
    const [formValues, setFormValues] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  })
  const [errors, setErrors] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log(await userService.getAll())
  }
  return (
    <div>
        <UserForm values={formValues} errors={errors} onChange={onChange} onSubmit={onSubmit} />
    </div>
  )
}
