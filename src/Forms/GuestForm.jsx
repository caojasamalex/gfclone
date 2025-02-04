import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../css/styles.css";

const GuestForms = () => {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState("short-answer");
  const [options, setOptions] = useState([""]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [image, setImage] = useState(null);

  // Handle title edit
  const handleTitleChange = (e) => setFormTitle(e.target.value);

  // Save or edit a question
  const saveQuestion = () => {
    if (newQuestion.trim() === "") return;

    const questionData = {
      id: `q-${Date.now()}`,
      text: newQuestion,
      type: questionType,
      options: questionType === "multiple-choice" ? [...options] : [],
      image: image ? URL.createObjectURL(image) : null, 
    };

    setQuestions([...questions, questionData]);

    // Reset input fields
    setNewQuestion("");
    setOptions([""]);
    setImage(null);
  };

  // Remove a question
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
    setDropdownOpen(null);
  };

  // Open edit mode
  const editQuestion = (index) => {
    const question = questions[index];
    setNewQuestion(question.text);
    setQuestionType(question.type);
    setOptions(question.options || [""]);
    removeQuestion(index); 
    setDropdownOpen(null);
  };

  // Drag & Drop Functionality
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items);
  };

  return (
    <div className="form-container">
      {/* Form Title */}
      <input
        type="text"
        className="form-title"
        value={formTitle}
        onChange={handleTitleChange}
      />

      {/* Add Question Form */}
      <div className="form-input">
        <input
          type="text"
          placeholder="Enter your question..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
          <option value="short-answer">Short Answer</option>
          <option value="paragraph">Paragraph</option>
          <option value="multiple-choice">Multiple Choice</option>
        </select>

        {questionType === "multiple-choice" && (
          <div className="multiple-choice-options">
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...options];
                  updatedOptions[index] = e.target.value;
                  setOptions(updatedOptions);
                }}
              />
            ))}
            <button onClick={() => setOptions([...options, ""])} className="add-option-btn">
              Add Option
            </button>
          </div>
        )}

        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button onClick={saveQuestion} className="add-question-btn">Add Question</button>
      </div>

      {/* Question List with Drag & Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div className="question-list" {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="question-card"
                    >
                      <div className="question-header">
                        <p><strong>{question.text}</strong></p>
                        <button
                          className="menu-btn"
                          onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                        >
                          ⋮
                        </button>
                        {dropdownOpen === index && (
                          <div className="dropdown-menu">
                            <button onClick={() => editQuestion(index)}>Edit</button>
                            <button onClick={() => removeQuestion(index)}>Delete</button>
                          </div>
                        )}
                      </div>

                      <p>Type: {question.type.replace("-", " ")}</p>

                      {question.image && <img src={question.image} alt="Question" className="question-image" />}

                      {question.type === "multiple-choice" && (
                        <ul>
                          {question.options.map((option, idx) => (
                            <li key={idx}>{option}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default GuestForms;
