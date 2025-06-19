import gradio as gr
from transformers import pipeline

# Load Hugging Face models
bias_classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn"
)

# Define your candidate political labels
bias_labels = ["true", "misleading", "false"]

# Core logic
def analyze_text(input_text):
    # Bias classification
    bias_result = bias_classifier(input_text, candidate_labels=bias_labels)
    predicted_bias = bias_result['labels'][0]
    confidence = bias_result['scores'][0]

    # Summarization
    summary = summarizer(input_text, max_length=100, min_length=30, do_sample=False)[0]['summary_text']

    return summary, predicted_bias, f"{confidence:.2f}"

# Gradio UI
iface = gr.Interface(
    fn=analyze_text,
    inputs=gr.Textbox(lines=6, placeholder="Paste a news article, headline, or social media post...", label="News Text"),
    outputs=[
        gr.Textbox(label="Neutral Summary"),
        gr.Textbox(label="Predicted Bias"),
        gr.Textbox(label="Confidence Score")
    ],
    title="📰 FactLens AI — News Veracity Analyzer",
    description="Analyze text for political bias and get a neutral summary. Powered by Hugging Face Transformers."
)

if __name__ == "__main__":
    iface.launch()
