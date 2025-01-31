type MessageCardProps = {
    role: "assistant" | "user";
    message: string;
};

export const MessageCard = (props: MessageCardProps) => {
    return (
        <div
            className={`rounded-lg px-4 py-2 max-w-md w-fit whitespace-pre-line ${
                props.role === "user" 
                ? "bg-blue-500 text-white self-end" 
                : "bg-gray-200"
            }`}
        >
            {props.message}
        </div>
    );
};
