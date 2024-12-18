import { useState, useEffect } from 'react';
import ThoughtsList from "./HappyT";
import MessageForm from "./Form";

const HappyThoughtsApp = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts');
        if (!response.ok) {
          throw new Error('Failed to fetch thoughts');
        }
        const data = await response.json();
        setThoughts(data);
      } catch (err) {
        console.error('Error fetching thoughts:', err);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchThoughts();
  }, []);

  const addThought = (newThought) => {
    setThoughts([newThought, ...thoughts]);
  };

  const onThoughtLiked = (thoughtId) => {
    setThoughts((prevThoughts) =>
      prevThoughts.map((thought) =>
        thought._id === thoughtId ? { ...thought, hearts: thought.hearts + 1 } : thought
      )
    );
  };

  return (
    <>
      <header><h1>Happy Thoughts Feed 😊</h1></header>
      <main>
        <section className="form-box">
          <MessageForm onThoughtAdded={addThought} />
        </section>
        <section className="thoughts-feed">
          {loading ? (
            <p>Loading thoughts...</p>
          ) : (
            <ThoughtsList thoughts={thoughts} onThoughtLiked={onThoughtLiked} />
          )}
        </section>
      </main>
    </>
  );
};

export default HappyThoughtsApp;
