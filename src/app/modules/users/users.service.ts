import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // ---> auto generated password
  const id = await generateUserId()
  user.id = id
  // ---> default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  //   ---> created id
  const createNewUser = await User.create(user)
  if (!createNewUser) {
    throw new Error('Failed to create user!')
  }
  return createNewUser
}

export default {
  createUser,
}
