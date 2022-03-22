import { useState, useEffect } from "react";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import Column from "./Column";
import styles from "./CategoryView.module.scss";

export default function CategoryView({ activities, trip_id, setActiveActivity }) {
  const categories = ["No Category", "Category 1", "Category 2"];
  const [storedActivities, setStoredActivities] = useState(activities);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Build category columns
    const columnsFromCategories = categories.map((category) => {
      const filteredActivities = activities?.filter((activity) => {
        if (category === "No Category") {
          return activity.category === undefined || activity.category.name === undefined;
        } else {
          return activity.category?.name === category;
        }
      });

      return {
        title: category,
        activities: filteredActivities,
      };
    });

    setColumns(columnsFromCategories);

    activities?.map((activity, i) => {
      return (activity.category = { name: undefined, index: i });
    });
  }, []);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // const column = categories[source.droppableId]
    let draggedActivity = storedActivities[source.index];
    draggedActivity.category = {
      name: destination.droppableId === "No Category" ? undefined : destination.droppableId,
      index: destination.index,
    };
    const newActivities = Array.from(storedActivities);
    // newActivities.splice(source.index, 1, draggedActivity);
    // newActivities.splice(destination.index, 0, draggedActivity);
    // console.log(source, destination, draggableId, storedActivities, newActivities);

    setStoredActivities(newActivities);
  }

  resetServerContext();

  // console.log(columns);

  return (
    <div className={styles.columnContainer}>
      <DragDropContext
        // onDragStart={}
        // onDragUpdate={}
        onDragEnd={onDragEnd}
      >
        {/* {categories.map((category, i) => {
          const filteredActivities = storedActivities.filter((activity) => {
            if (category === "No Category") {
              return activity.category === undefined || activity.category.name === undefined;
            } else {
              return activity.category?.name === category;
            }
          });
          return (
            <Column
              key={category}
              activities={filteredActivities.sort((a, b) => a.category?.index - b.category?.index)}
              trip_id={trip_id}
              category={category}
            />
          );
        })} */}
        {columns.map(({ title, activities }) => {
          return (
            <Column
              key={title}
              activities={activities}
              trip_id={trip_id}
              category={title}
              setActiveActivity={setActiveActivity}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
}
