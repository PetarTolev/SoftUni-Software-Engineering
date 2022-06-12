﻿using Microsoft.EntityFrameworkCore;

namespace Forum.Controllers
{
    using System;
    using System.Linq;
    using Forum.Models;
    using Microsoft.AspNetCore.Authorization;
    using Forum.Data;
    using Microsoft.AspNetCore.Mvc;

    public class CommentController : Controller
    {
        private readonly ForumDbContext context;

        public CommentController(ForumDbContext context)
        {
            this.context = context;
        }

        [Authorize]
        [HttpGet]
        [Route("/Topic/Details/{id}/Comment/Create")]
        public IActionResult Create(int id)
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        [Route("/Topic/Details/{TopicId}/Comment/Create")]
        public IActionResult Create(Comment comment)
        {
            if (ModelState.IsValid)
            {
                comment.CreatedDate = DateTime.Now;
                comment.LastUpdatedDate = DateTime.Now;

                string authorId = context
                    .Users
                    .Where(u => u.UserName == User.Identity.Name)
                    .SingleOrDefault()
                    .Id;

                comment.AuthorId = authorId;

                Topic topic = context.Topics.Find(comment.TopicId);
                topic.LastUpdatedDate = DateTime.Now;

                context.Comments.Add(comment);
                context.SaveChanges();
                return Redirect($"/Topic/Details/{comment.TopicId}");
            }

            return View(comment);
        }

        [Authorize]
        [HttpGet]
        [Route("/Topic/Details/{TopicId}/Comment/Edit/{id}")]
        public IActionResult Edit(int? topicId, int? id)
        {
            if (id == null)
            {
                return RedirectToAction($"/Topic/Details/{topicId}");
            }
            Comment comment = context
                .Comments
                .Include(c => c.Author)
                .Include(c => c.Topic)
                .ThenInclude(t => t.Author)
                .SingleOrDefault(c => c.CommentId == id);

            if (comment == null)
            {
                return RedirectPermanent($"/Topic/Details/{topicId}");
            }

            return View(comment);
        }

        [Authorize]
        [HttpPost]
        [Route("/Topic/Details/{TopicId}/Comment/Edit/{id}")]
        public IActionResult Edit(Comment comment)
        {
            if (ModelState.IsValid)
            {
                var commentFromDb = context
                    .Comments
                    .Include(c => c.Author)
                    .SingleOrDefault(c => c.CommentId.Equals(comment.CommentId));

                if (commentFromDb == null)
                {
                    return RedirectPermanent($"/Topic/Details/{comment.TopicId}");
                }

                commentFromDb.Description = comment.Description;
                commentFromDb.LastUpdatedDate = DateTime.Now;

                Topic topic = context.Topics.Find(comment.TopicId);
                topic.LastUpdatedDate = DateTime.Now;

                context.SaveChanges();

                return RedirectPermanent($"/Topic/Details/{comment.TopicId}");
            }

            return View(comment);
        }

        [Route("/Topic/Details/{TopicId}/Comment/Delete/{id}")]
        public IActionResult Delete(int topicId, int? id)
        {
            if (id == null)
            {
                return RedirectPermanent($"/Topic/Details/{topicId}");
            }

            var comment = context
                .Comments
                .Include(c => c.Author)
                .Include(c => c.Topic)
                .ThenInclude(t => t.Author)
                .SingleOrDefault(c => c.CommentId == id);

            if (comment == null)
            {
                return RedirectPermanent($"/Topic/Details/{topicId}");
            }

            return View(comment);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("/Topic/Details/{TopicId}/Comment/Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var comment = context
                .Comments
                .Find(id);

            if (comment != null)
            {
                Topic topic = context.Topics.Find(comment.TopicId);
                topic.LastUpdatedDate = DateTime.Now;

                context.Comments.Remove(comment);
                context.SaveChanges();
            }

            return RedirectPermanent($"/Topic/Details/{comment.TopicId}");
        }
    }
}