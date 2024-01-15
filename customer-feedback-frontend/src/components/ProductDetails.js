import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { faStar, faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductDetails = () => {
  const { productId } = useParams();
  const [feedbackData, setFeedbackData] = useState({
    customerName: '',
    customerId: '',
    rating: 0,
    feedbackMessage: '',
  });
  const [comments, setComments] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [socket, setSocket] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const commentsContainerRef = useRef(null);

  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      withCredentials: true,
      reconnection: true,
    });
    setSocket(newSocket);

    newSocket.on('comment', (comment) => {
      setComments((prevComments) => [comment, ...prevComments]);
      // Scroll to the latest comment
      commentsContainerRef.current.scrollTop = 0;
    });

    const loggedInUsername = localStorage.getItem('username');
    setFeedbackData((prevData) => ({
      ...prevData,
      customerName: loggedInUsername || '',
    }));

    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/feedbacks/${productId}`);
        if (response.ok) {
          const feedbacksData = await response.json();
          setComments(feedbacksData.reverse());
        } else {
          console.error('Failed to fetch feedbacks');
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const productResponse = await fetch(`http://localhost:3001/products`);
        if (productResponse.ok) {
          const productsData = await productResponse.json();

          const selectedProduct = productsData.find((product) => product._id === productId);

          if (selectedProduct) {
            setProductDetails(selectedProduct);
          } else {
            console.error('Product not found for the given productId:', productId);
          }
        } else {
          console.error(
            'Failed to fetch product details. Server returned:',
            productResponse.status
          );
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchFeedbacks();
    fetchProductDetails();

    return () => {
      newSocket.disconnect();
    };
  }, [productId, formSubmitted]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStarClick = (selectedRating) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      rating: selectedRating,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (socket) {
        const dataToSend = {
          ...feedbackData,
          productId: productId,
        };

        const response = await fetch('http://localhost:3001/submitFeedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          throw new Error('Failed to submit feedback');
        }

        setFeedbackData({
          customerName: '',
          customerId: '',
          rating: 0,
          feedbackMessage: '',
        });

        setFormSubmitted((prev) => !prev);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleDelete = (commentId) => {
    // Find the feedback to delete
    const feedback = comments.find((comment) => comment._id === commentId);

    // Set the feedback details to the state
    setFeedbackToDelete(feedback);

    // Show the delete modal
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (feedbackToDelete) {
        const response = await fetch('http://localhost:3001/deleteFeedback', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ commentId: feedbackToDelete._id }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete feedback');
        }

        // Remove the deleted feedback from the state
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== feedbackToDelete._id)
        );
      }

      // Hide the delete modal
      setShowDeleteModal(false);
      // Reset feedbackToDelete state
      setFeedbackToDelete(null);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const cancelDelete = () => {
    // Hide the delete modal
    setShowDeleteModal(false);
    // Reset feedbackToDelete state
    setFeedbackToDelete(null);
  };

  return (
    <div className="container mt-5">
      <div className="card mt-4 border rounded shadow">
  <div className="row g-0">
    <div className="col-md-4">
      <img
        src={productDetails.imageUrl}
        alt={productDetails.name}
        className="img-fluid rounded-start p-3" // Added padding to the image
        style={{ objectFit: 'cover', maxHeight: '100%' }}
      />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{productDetails.name}</h5>
        <p className="card-text">{productDetails.description}</p>
        <p className="card-text">
          <small className="text-muted">Product ID: {productId}</small>
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary">Add to Cart</button>
          <span className="badge bg-secondary">
            199${productDetails.price?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

      <form onSubmit={handleSubmit} className="mt-3 border p-4 bg-light">
        <h3 className="text-center text-primary">Feedback Form</h3>
        <div className="mb-3">
          <label className="form-label">Customer Name:</label>
          <input
            type="text"
            className="form-control"
            name="customerName"
            value={feedbackData.customerName}
            onChange={handleInputChange}
            readOnly={!isEditingUsername}
            onClick={handleUsernameEdit}
            required
          />
          {!isEditingUsername && (
            <small className="form-text text-muted">Click the username to edit.</small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            className="form-control"
            name="customerId"
            value={feedbackData.customerId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={`star-icon${star <= feedbackData.rating ? ' active' : ''}`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
          <input type="hidden" name="rating" value={feedbackData.rating} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Feedback Message:</label>
          <textarea
            className="form-control"
            name="feedbackMessage"
            value={feedbackData.feedbackMessage}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>

      <div className="mt-5">
        <h3>Feedback Comments</h3>
        {comments.map((comment, index) => (
          <div key={`${comment._id}-${Date.now()}-${index}`} className="card mb-3">
            <div className="card-body mycarddetails">
              <div className="left-section">
                <p className="card-text">{comment.feedbackMessage}</p>
                <p className="card-subtitle text-muted">
                  <span>
                    <FontAwesomeIcon icon={faUser} className="mr-1" />
                    &nbsp;Posted by <span className="username">{comment.customerName}</span>
                  </span>
                  <span>
                    {' '}
                    on{' '}
                    {comment.timestamp
                      ? new Date(comment.timestamp).toLocaleString()
                      : 'N/A'}
                  </span>
                </p>
              </div>

              <div className="right-section">
                <div className="star-rating">
                  {[...Array(comment.rating).keys()].map((star) => (
                    <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className="star-icon active"
                    />
                  ))}
                </div>
                <p className="rating-text">{comment.rating}/5</p>
              </div>

              {localStorage.getItem('username') === 'admin' && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm float-end"
                  onClick={() => handleDelete(comment._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the feedback by {feedbackToDelete?.customerName}?</p>
                <p>{feedbackToDelete?.feedbackMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
