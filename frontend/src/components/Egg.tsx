import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  id: number;
};

export const Egg: React.FC<Props> = ({ id }) => {
  const [name, setName] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const metadata = await axios.get(
        `${process.env.VITE_API_URL}/eggs/${id}`
      );
      setName(metadata.data.name);
      setImage(`https://ipfs.io/${metadata.data.image.replace("://", "/")}`);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      <img src={image} alt={name} className="mb-2" />
      <p className="mb-2">#{id}</p>
      <p className="mb-2">
        <strong>{name}</strong>
      </p>
    </div>
  );
};
