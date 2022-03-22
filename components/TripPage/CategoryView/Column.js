import ActivityCard from "components/ActivityCard/ActivityCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./CategoryView.module.scss";

export default function Column({ activities, trip_id, category, setActiveActivity }) {
  // console.log(category);
  return (
    <div className={styles.column}>
      <header className={styles.categoryHeader}>
        <h3>{category}</h3>
      </header>

      <Droppable droppableId={category}>
        {(droppableProvided, droppableSnapshot) => {
          // console.log(droppableSnapshot);
          return (
            <div
              className={styles.list}
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              // style={{ background: droppableSnapshot.isDraggingOver ? "red" : "transparent" }}
            >
              {activities?.map((activity, index) => {
                return (
                  <Draggable draggableId={activity._id} index={index} key={activity._id}>
                    {(draggableProvided, draggableSnapshop) => {
                      // console.log(draggableSnapshop);
                      return (
                        <div
                          className={styles.activity}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          // key={activity._id + 1}
                          // style={{
                          //   backgroundColor: draggableSnapshop.isDragging ? "red" : "transparent",
                          // }}
                        >
                          <ActivityCard
                            key={activity._id}
                            activity={activity}
                            trip_id={trip_id}
                            isDragging={draggableSnapshop.isDragging}
                            setActiveActivity={setActiveActivity}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}

              {droppableProvided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
