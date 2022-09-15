package messages

var errorMsgs = map[int]string{
	UNAUTHORIZED: "User is not authenticated. Please Sign Up",
    FORBIDDEN: "Email or Password didnt match. Please login again with right credentials",
	INTERNAL_SERVER_ERROR: "fail",
	SUCCESS: "success",
}

func GetMsg(status int) string {
	val, ok := errorMsgs[status]

	if(ok) {
		return val
	}

	return errorMsgs[INTERNAL_SERVER_ERROR]
}