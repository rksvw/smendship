import redis from "../config/redisConfig";

export const publishMessage = async (chatRoomId, message) => {
  const payload = JSON.stringify(message);
  await redis.publish(`CHAT_${chatRoomId}`, payload);
};
